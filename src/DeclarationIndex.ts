import { difference, differenceWith, intersection, isEqual } from 'lodash';
import { join, normalize, relative, resolve } from 'path';

import { DeclarationInfo } from './declarations/DeclarationInfo';
import { ModuleDeclaration } from './declarations/ModuleDeclaration';
import { AllExport } from './exports/AllExport';
import { AssignedExport } from './exports/AssignedExport';
import { NamedExport } from './exports/NamedExport';
import { File } from './resources/File';
import { Module } from './resources/Module';
import { Namespace } from './resources/Namespace';
import { Resource } from './resources/Resource';
import { isExportableDeclaration } from './type-guards/TypescriptHeroGuards';
import { TypescriptParser } from './TypescriptParser';
import { normalizeFilename, normalizePathUri, toPosix } from './utilities/PathHelpers';

/**
 * Returns the name of the node folder. Is used as the library name for indexing.
 * (e.g. ./node_modules/webpack returns webpack)
 *
 * @param {string} path
 * @returns {string}
 */
function getNodeLibraryName(path: string): string {
    const dirs = path.split(/\/|\\/);
    const nodeIndex = dirs.indexOf('node_modules');

    return normalizeFilename(dirs.slice(nodeIndex + 1).join('/'))
        .replace(new RegExp(`/(index|${dirs[nodeIndex + 1]}|${dirs[dirs.length - 2]})$`), '');
}

/**
 * Helper type to index all possible resources of the current workspace.
 */
type Resources = { [name: string]: Resource };

/**
 * IndexDelta type, is calculated by the declaration index to give an overview, what has changed in the index.
 * Returns a list of deleted declarations, newly added declarations (with the corresponding infos) and
 * which declarations have been updated (with all declarations under that name).
 */
export type IndexDelta = {
    added: { [declaration: string]: DeclarationInfo[] };
    updated: { [declaration: string]: DeclarationInfo[] };
    deleted: string[];
};

/**
 * Interface for file changes. Contains lists of file uri's to the specific action.
 *
 * @export
 * @interface FileChanges
 */
export interface FileChanges {
    created: string[];
    updated: string[];
    deleted: string[];
}

/**
 * Global index of declarations. Contains declarations and origins.
 * Provides reverse index for search and declaration info for imports.
 *
 * @export
 * @class DeclarationIndex
 */
export class DeclarationIndex {
    private building: boolean;

    /**
     * Hash of parsed resources. Contains all parsed files / namespaces / declarations
     * of the current workspace.
     *
     * @private
     * @type {Resources}
     * @memberof DeclarationIndex
     */
    private parsedResources: Resources = Object.create(null);

    /**
     * Declaration index. Reverse index from a name to many declarations assotiated to the name.
     *
     * @private
     * @type {({ [declaration: string]: DeclarationInfo[] } | undefined)}
     * @memberof DeclarationIndex
     */
    private _index: { [declaration: string]: DeclarationInfo[] } | undefined;

    /**
     * Indicator if the first index was loaded and calculated or not.
     *
     * @readonly
     * @type {boolean}
     * @memberof DeclarationIndex
     */
    public get indexReady(): boolean {
        return this._index !== undefined; // && this._indexWithBarrels !== undefined;
    }

    /**
     * Reverse index of the declarations.
     *
     * @readonly
     * @type {({ [declaration: string]: DeclarationInfo[] } | undefined)}
     * @memberof DeclarationIndex
     */
    public get index(): { [declaration: string]: DeclarationInfo[] } | undefined {
        return this._index;
    }

    /**
     * List of all declaration information. Contains the typescript declaration and the
     * "from" information (from where the symbol is imported).
     *
     * @readonly
     * @type {DeclarationInfo[]}
     * @memberof DeclarationIndex
     */
    public get declarationInfos(): DeclarationInfo[] {
        return Object
            .keys(this.index!)
            .sort()
            .reduce((all, key) => all.concat(this.index![key]), <DeclarationInfo[]>[]);
    }

    constructor(private parser: TypescriptParser, private rootPath: string) { }

    /**
     * Calculates the differences between two indices. Calculates removed, added and updated declarations.
     * The updated declarations are calculated and all declarations that the new index contains are inserted in the list.
     *
     * @static
     * @param {{ [declaration: string]: DeclarationInfo[] }} oldIndex
     * @param {{ [declaration: string]: DeclarationInfo[] }} newIndex
     * @returns {IndexDelta}
     * @memberof DeclarationIndex
     */
    public static calculateIndexDelta(
        oldIndex: { [declaration: string]: DeclarationInfo[] },
        newIndex: { [declaration: string]: DeclarationInfo[] },
    ): IndexDelta {
        const oldKeys = Object.keys(oldIndex);
        const newKeys = Object.keys(newIndex);

        return {
            added: difference(newKeys, oldKeys).reduce(
                (obj, currentKey) => {
                    obj[currentKey] = newIndex[currentKey];
                    return obj;
                },
                {} as { [declaration: string]: DeclarationInfo[] },
            ),
            updated: intersection(oldKeys, newKeys).reduce(
                (obj, currentKey) => {
                    const old = oldIndex[currentKey];
                    const neu = newIndex[currentKey];

                    if (differenceWith(neu, old, isEqual).length > 0 || differenceWith(old, neu, isEqual).length > 0) {
                        obj[currentKey] = neu;
                    }

                    return obj;
                },
                {} as { [declaration: string]: DeclarationInfo[] },
            ),
            deleted: difference(oldKeys, newKeys),
        };
    }

    /**
     * Resets the whole index. Does delete everything. Period.
     * Is useful for unit testing or similar things.
     *
     * @memberof DeclarationIndex
     */
    public reset(): void {
        this.parsedResources = Object.create(null);
        this._index = undefined;
    }

    /**
     * Tells the index to build a new index.
     * Can be canceled with a cancellationToken.
     *
     * @param {string[]} filePathes
     * @returns {Promise<void>}
     *
     * @memberof DeclarationIndex
     */
    public async buildIndex(filePathes: string[]): Promise<void> {
        if (this.building) {
            return;
        }

        try {
            this.building = true;
            const parsed = await this.parser.parseFiles(filePathes, this.rootPath);

            this.parsedResources = await this.parseResources(parsed);
            this._index = await this.createIndex(this.parsedResources);
        } catch (e) {
            throw e;
        } finally {
            this.building = false;
        }
    }

    /**
     * Is called when file events happen. Does reindex for the changed files and creates a new index.
     * Returns the differences for the new index.
     *
     * @param {FileEvent[]} changes
     * @returns {Promise<IndexDelta>}
     *
     * @memberof DeclarationIndex
     */
    public async reindexForChanges(changes: FileChanges): Promise<IndexDelta> {
        const rebuildResources: string[] = [];
        const removeResources: string[] = [];
        const rebuildFiles: string[] = [];

        for (const change of changes.deleted) {
            const filePath = normalizePathUri(change);
            const resource = '/' + normalizeFilename(relative(this.rootPath, filePath));

            if (removeResources.indexOf(resource) < 0) {
                removeResources.push(resource);
            }

            for (const file of this.getExportedResources(resource)) {
                if (rebuildFiles.indexOf(file) < 0) {
                    rebuildFiles.push(file);
                }
            }
        }

        for (const change of (changes.created || []).concat(changes.updated)) {
            const filePath = normalizePathUri(change);
            const resource = '/' + normalizeFilename(relative(this.rootPath, filePath));

            if (rebuildResources.indexOf(resource) < 0) {
                rebuildResources.push(resource);
            }
            if (rebuildFiles.indexOf(filePath) < 0) {
                rebuildFiles.push(filePath);
            }

            for (const file of this.getExportedResources(resource)) {
                if (rebuildFiles.indexOf(file) < 0) {
                    rebuildFiles.push(file);
                }
            }
        }

        const resources = await this.parseResources(
            await this.parser.parseFiles(rebuildFiles, this.rootPath),
        );
        for (const del of removeResources) {
            delete this.parsedResources[del];
        }
        for (const key of Object.keys(resources)) {
            this.parsedResources[key] = resources[key];
        }
        const old = this._index || {};
        this._index = await this.createIndex(this.parsedResources);

        return DeclarationIndex.calculateIndexDelta(old, this._index);
    }

    /**
     * Returns a list of files that export a certain resource (declaration).
     *
     * @private
     * @param {string} resourceToCheck
     * @returns {string[]}
     *
     * @memberof DeclarationIndex
     */
    private getExportedResources(resourceToCheck: string): string[] {
        const resources: string[] = [];
        Object
            .keys(this.parsedResources)
            .forEach((key) => {
                const resource = this.parsedResources[key];
                if (resource instanceof File && this.doesExportResource(resource, resourceToCheck)) {
                    resources.push(resource.filePath);
                }
            });
        return resources;
    }

    /**
     * Checks if a file does export another resource.
     * (i.e. export ... from ...)
     *
     * @private
     * @param {File} resource The file that is checked
     * @param {string} resourcePath The resource that is searched for
     * @returns {boolean}
     *
     * @memberof DeclarationIndex
     */
    private doesExportResource(resource: File, resourcePath: string): boolean {
        let exportsResource = false;

        for (const ex of resource.exports) {
            if (exportsResource) {
                break;
            }
            if (ex instanceof AllExport || ex instanceof NamedExport) {
                const exported = '/' + toPosix(relative(this.rootPath, normalize(join(resource.parsedPath.dir, ex.from))));
                exportsResource = exported === resourcePath;
            }
        }

        return exportsResource;
    }

    /**
     * Does parse the resources (symbols and declarations) of a given file.
     * Can be cancelled with the token.
     *
     * @private
     * @param {File[]} [files=[]]
     * @returns {Promise<Resources>}
     *
     * @memberof DeclarationIndex
     */
    private async parseResources(files: File[] = []): Promise<Resources> {
        const parsedResources: Resources = Object.create(null);

        for (const file of files) {
            if (file.filePath.indexOf('typings') > -1 || file.filePath.indexOf('node_modules/@types') > -1) {
                for (const resource of file.resources) {
                    parsedResources[resource.identifier] = resource;
                }
            } else if (file.filePath.indexOf('node_modules') > -1) {
                const libname = getNodeLibraryName(file.filePath);
                parsedResources[libname] = file;
            } else {
                parsedResources[file.identifier] = file;
            }
        }

        for (const key of Object.keys(parsedResources).sort((k1, k2) => k2.length - k1.length)) {
            const resource = parsedResources[key];
            resource.declarations = resource.declarations.filter(
                o => isExportableDeclaration(o) && o.isExported,
            );
            this.processResourceExports(parsedResources, resource);
        }

        return parsedResources;
    }

    /**
     * Creates a reverse index out of the give resources.
     * Can be cancelled with the token.
     *
     * @private
     * @param {Resources} resources
     * @returns {Promise<ResourceIndex>}
     *
     * @memberof DeclarationIndex
     */
    private async createIndex(resources: Resources): Promise<{ [declaration: string]: DeclarationInfo[] }> {
        // Use an empty object without a prototype, so that "toString" (for example) can be indexed
        // Thanks to @gund in https://github.com/buehler/typescript-hero/issues/79
        const index: { [declaration: string]: DeclarationInfo[] } = Object.create(null);

        for (const key of Object.keys(resources)) {
            const resource = resources[key];
            if (resource instanceof Namespace || resource instanceof Module) {
                if (!index[resource.name]) {
                    index[resource.name] = [];
                }
                index[resource.name].push(new DeclarationInfo(
                    new ModuleDeclaration(resource.getNamespaceAlias(), resource.start, resource.end),
                    resource.name,
                ));
            }
            for (const declaration of resource.declarations) {
                if (!index[declaration.name]) {
                    index[declaration.name] = [];
                }
                const from = key.replace(/\/index$/, '') || '/';
                if (!index[declaration.name].some(
                    o => o.declaration.constructor === declaration.constructor && o.from === from,
                )) {
                    index[declaration.name].push(new DeclarationInfo(declaration, from));
                }
            }
        }
        return index;
    }

    /**
     * Process all exports of a the parsed resources. Does move the declarations accordingly to their
     * export nature.
     *
     * @private
     * @param {Resources} parsedResources
     * @param {Resource} resource
     * @param {Resource[]} [processedResources=[]]
     * @returns {void}
     *
     * @memberof DeclarationIndex
     */
    private processResourceExports(
        parsedResources: Resources,
        resource: Resource,
        processedResources: Resource[] = [],
    ): void {
        if (processedResources.indexOf(resource) >= 0 || resource.exports.length === 0) {
            return;
        }
        processedResources.push(resource);

        for (const ex of resource.exports) {
            if (resource instanceof File && (ex instanceof NamedExport || ex instanceof AllExport)) {
                if (!ex.from) {
                    return;
                }

                let sourceLib = resolve(resource.parsedPath.dir, ex.from);
                if (sourceLib.indexOf('node_modules') > -1) {
                    sourceLib = getNodeLibraryName(sourceLib);
                } else {
                    sourceLib = '/' + normalizeFilename(relative(this.rootPath, sourceLib));
                }

                if (!parsedResources[sourceLib]) {
                    return;
                }

                const exportedLib = parsedResources[sourceLib];
                this.processResourceExports(parsedResources, exportedLib, processedResources);

                if (ex instanceof AllExport) {
                    this.processAllFromExport(resource, exportedLib);
                } else {
                    this.processNamedFromExport(ex, resource, exportedLib);
                }
            } else {
                if (ex instanceof AssignedExport) {
                    for (const lib of ex.exported.filter(o => !isExportableDeclaration(o))) {
                        this.processResourceExports(parsedResources, lib as Resource, processedResources);
                    }
                    this.processAssignedExport(ex, resource);
                } else if (ex instanceof NamedExport && ex.from && parsedResources[ex.from]) {
                    this.processResourceExports(
                        parsedResources, parsedResources[ex.from], processedResources,
                    );
                    this.processNamedFromExport(ex, resource, parsedResources[ex.from]);
                }
            }
        }
    }

    /**
     * Processes an all export, does move the declarations accordingly.
     * (i.e. export * from './myFile')
     *
     * @private
     * @param {Resource} exportingLib
     * @param {Resource} exportedLib
     *
     * @memberof DeclarationIndex
     */
    private processAllFromExport(exportingLib: Resource, exportedLib: Resource): void {
        exportingLib.declarations.push(...exportedLib.declarations);
        exportedLib.declarations = [];
    }

    /**
     * Processes a named export, does move the declarations accordingly.
     * (i.e. export {MyClass} from './myFile')
     *
     * @private
     * @param {NamedExport} tsExport
     * @param {Resource} exportingLib
     * @param {Resource} exportedLib
     *
     * @memberof DeclarationIndex
     */
    private processNamedFromExport(
        tsExport: NamedExport,
        exportingLib: Resource,
        exportedLib: Resource,
    ): void {
        exportedLib.declarations
            .forEach((o) => {
                const ex = tsExport.specifiers.find(s => s.specifier === o.name);
                if (!ex) {
                    return;
                }
                exportedLib.declarations.splice(exportedLib.declarations.indexOf(o), 1);
                if (ex.alias) {
                    o.name = ex.alias;
                }
                exportingLib.declarations.push(o);
            });
    }

    /**
     * Processes an assigned export, does move the declarations accordingly.
     * (i.e. export = namespaceName)
     *
     * @private
     * @param {AssignedExport} tsExport
     * @param {Resource} exportingLib
     *
     * @memberof DeclarationIndex
     */
    private processAssignedExport(
        tsExport: AssignedExport,
        exportingLib: Resource,
    ): void {
        tsExport.exported.forEach((exported) => {
            if (isExportableDeclaration(exported)) {
                exportingLib.declarations.push(exported);
            } else {
                exportingLib.declarations.push(
                    ...exported.declarations.filter(
                        o => isExportableDeclaration(o) && o.isExported,
                    ),
                );
                exported.declarations = [];
            }
        });
    }
}
