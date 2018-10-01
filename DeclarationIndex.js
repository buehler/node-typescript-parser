"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const path_1 = require("path");
const DeclarationInfo_1 = require("./declarations/DeclarationInfo");
const ModuleDeclaration_1 = require("./declarations/ModuleDeclaration");
const AllExport_1 = require("./exports/AllExport");
const AssignedExport_1 = require("./exports/AssignedExport");
const NamedExport_1 = require("./exports/NamedExport");
const File_1 = require("./resources/File");
const Module_1 = require("./resources/Module");
const Namespace_1 = require("./resources/Namespace");
const TypescriptHeroGuards_1 = require("./type-guards/TypescriptHeroGuards");
const PathHelpers_1 = require("./utilities/PathHelpers");
/**
 * Returns the name of the node folder. Is used as the library name for indexing.
 * (e.g. ./node_modules/webpack returns webpack)
 *
 * @param {string} path
 * @returns {string}
 */
function getNodeLibraryName(path) {
    const dirs = path.split(/\/|\\/);
    const nodeIndex = dirs.indexOf('node_modules');
    return PathHelpers_1.normalizeFilename(dirs.slice(nodeIndex + 1).join('/'))
        .replace(new RegExp(`/(index|${dirs[nodeIndex + 1]}|${dirs[dirs.length - 2]})$`), '');
}
/**
 * Global index of declarations. Contains declarations and origins.
 * Provides reverse index for search and declaration info for imports.
 *
 * @export
 * @class DeclarationIndex
 */
class DeclarationIndex {
    constructor(parser, rootPath) {
        this.parser = parser;
        this.rootPath = rootPath;
        this.building = false;
        /**
         * Hash of parsed resources. Contains all parsed files / namespaces / declarations
         * of the current workspace.
         *
         * @private
         * @type {Resources}
         * @memberof DeclarationIndex
         */
        this.parsedResources = Object.create(null);
    }
    /**
     * Indicator if the first index was loaded and calculated or not.
     *
     * @readonly
     * @type {boolean}
     * @memberof DeclarationIndex
     */
    get indexReady() {
        return this._index !== undefined; // && this._indexWithBarrels !== undefined;
    }
    /**
     * Reverse index of the declarations.
     *
     * @readonly
     * @type {({ [declaration: string]: DeclarationInfo[] } | undefined)}
     * @memberof DeclarationIndex
     */
    get index() {
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
    get declarationInfos() {
        return Object
            .keys(this.index)
            .sort()
            .reduce((all, key) => all.concat(this.index[key]), []);
    }
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
    static calculateIndexDelta(oldIndex, newIndex) {
        const oldKeys = Object.keys(oldIndex);
        const newKeys = Object.keys(newIndex);
        return {
            added: lodash_1.difference(newKeys, oldKeys).reduce((obj, currentKey) => {
                obj[currentKey] = newIndex[currentKey];
                return obj;
            }, {}),
            updated: lodash_1.intersection(oldKeys, newKeys).reduce((obj, currentKey) => {
                const old = oldIndex[currentKey];
                const neu = newIndex[currentKey];
                if (lodash_1.differenceWith(neu, old, lodash_1.isEqual).length > 0 || lodash_1.differenceWith(old, neu, lodash_1.isEqual).length > 0) {
                    obj[currentKey] = neu;
                }
                return obj;
            }, {}),
            deleted: lodash_1.difference(oldKeys, newKeys),
        };
    }
    /**
     * Resets the whole index. Does delete everything. Period.
     * Is useful for unit testing or similar things.
     *
     * @memberof DeclarationIndex
     */
    reset() {
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
    buildIndex(filePathes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.building) {
                return;
            }
            try {
                this.building = true;
                const parsed = yield this.parser.parseFiles(filePathes, this.rootPath);
                this.parsedResources = yield this.parseResources(parsed);
                this._index = yield this.createIndex(this.parsedResources);
            }
            catch (e) {
                throw e;
            }
            finally {
                this.building = false;
            }
        });
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
    reindexForChanges(changes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rebuildResources = [];
            const removeResources = [];
            const rebuildFiles = [];
            for (const change of changes.deleted) {
                const filePath = PathHelpers_1.normalizePathUri(change);
                const resource = '/' + PathHelpers_1.normalizeFilename(path_1.relative(this.rootPath, filePath));
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
                const filePath = PathHelpers_1.normalizePathUri(change);
                const resource = '/' + PathHelpers_1.normalizeFilename(path_1.relative(this.rootPath, filePath));
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
            const resources = yield this.parseResources(yield this.parser.parseFiles(rebuildFiles, this.rootPath));
            for (const del of removeResources) {
                delete this.parsedResources[del];
            }
            for (const key of Object.keys(resources)) {
                this.parsedResources[key] = resources[key];
            }
            const old = this._index || {};
            this._index = yield this.createIndex(this.parsedResources);
            return DeclarationIndex.calculateIndexDelta(old, this._index);
        });
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
    getExportedResources(resourceToCheck) {
        const resources = [];
        Object
            .keys(this.parsedResources)
            .forEach((key) => {
            const resource = this.parsedResources[key];
            if (resource instanceof File_1.File && this.doesExportResource(resource, resourceToCheck)) {
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
    doesExportResource(resource, resourcePath) {
        let exportsResource = false;
        for (const ex of resource.exports) {
            if (exportsResource) {
                break;
            }
            if (ex instanceof AllExport_1.AllExport || ex instanceof NamedExport_1.NamedExport) {
                const exported = '/' + PathHelpers_1.toPosix(path_1.relative(this.rootPath, path_1.normalize(path_1.join(resource.parsedPath.dir, ex.from))));
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
    parseResources(files = []) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const parsedResources = Object.create(null);
            for (const file of files) {
                if (file.filePath.indexOf('typings') > -1 || file.filePath.indexOf('node_modules/@types') > -1) {
                    for (const resource of file.resources) {
                        parsedResources[resource.identifier] = resource;
                    }
                }
                else if (file.filePath.indexOf('node_modules') > -1) {
                    const libname = getNodeLibraryName(file.filePath);
                    parsedResources[libname] = file;
                }
                else {
                    parsedResources[file.identifier] = file;
                }
            }
            for (const key of Object.keys(parsedResources).sort((k1, k2) => k2.length - k1.length)) {
                const resource = parsedResources[key];
                resource.declarations = resource.declarations.filter(o => TypescriptHeroGuards_1.isExportableDeclaration(o) && o.isExported);
                this.processResourceExports(parsedResources, resource);
            }
            return parsedResources;
        });
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
    createIndex(resources) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Use an empty object without a prototype, so that "toString" (for example) can be indexed
            // Thanks to @gund in https://github.com/buehler/typescript-hero/issues/79
            const index = Object.create(null);
            for (const key of Object.keys(resources)) {
                const resource = resources[key];
                if (resource instanceof Namespace_1.Namespace || resource instanceof Module_1.Module) {
                    if (!index[resource.name]) {
                        index[resource.name] = [];
                    }
                    index[resource.name].push(new DeclarationInfo_1.DeclarationInfo(new ModuleDeclaration_1.ModuleDeclaration(resource.getNamespaceAlias(), resource.start, resource.end), resource.name));
                }
                for (const declaration of resource.declarations) {
                    if (!index[declaration.name]) {
                        index[declaration.name] = [];
                    }
                    const from = key.replace(/\/index$/, '') || '/';
                    if (!index[declaration.name].some(o => o.declaration.constructor === declaration.constructor && o.from === from)) {
                        index[declaration.name].push(new DeclarationInfo_1.DeclarationInfo(declaration, from));
                    }
                }
            }
            return index;
        });
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
    processResourceExports(parsedResources, resource, processedResources = []) {
        if (processedResources.indexOf(resource) >= 0 || resource.exports.length === 0) {
            return;
        }
        processedResources.push(resource);
        for (const ex of resource.exports) {
            if (resource instanceof File_1.File && (ex instanceof NamedExport_1.NamedExport || ex instanceof AllExport_1.AllExport)) {
                if (!ex.from) {
                    return;
                }
                let sourceLib = path_1.resolve(resource.parsedPath.dir, ex.from);
                if (sourceLib.indexOf('node_modules') > -1) {
                    sourceLib = getNodeLibraryName(sourceLib);
                }
                else {
                    sourceLib = '/' + PathHelpers_1.normalizeFilename(path_1.relative(this.rootPath, sourceLib));
                }
                if (!parsedResources[sourceLib]) {
                    return;
                }
                const exportedLib = parsedResources[sourceLib];
                this.processResourceExports(parsedResources, exportedLib, processedResources);
                if (ex instanceof AllExport_1.AllExport) {
                    this.processAllFromExport(resource, exportedLib);
                }
                else {
                    this.processNamedFromExport(ex, resource, exportedLib);
                }
            }
            else {
                if (ex instanceof AssignedExport_1.AssignedExport) {
                    for (const lib of ex.exported.filter(o => !TypescriptHeroGuards_1.isExportableDeclaration(o))) {
                        this.processResourceExports(parsedResources, lib, processedResources);
                    }
                    this.processAssignedExport(ex, resource);
                }
                else if (ex instanceof NamedExport_1.NamedExport && ex.from && parsedResources[ex.from]) {
                    this.processResourceExports(parsedResources, parsedResources[ex.from], processedResources);
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
    processAllFromExport(exportingLib, exportedLib) {
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
    processNamedFromExport(tsExport, exportingLib, exportedLib) {
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
    processAssignedExport(tsExport, exportingLib) {
        tsExport.exported.forEach((exported) => {
            if (TypescriptHeroGuards_1.isExportableDeclaration(exported)) {
                exportingLib.declarations.push(exported);
            }
            else {
                exportingLib.declarations.push(...exported.declarations.filter(o => TypescriptHeroGuards_1.isExportableDeclaration(o) && o.isExported));
                exported.declarations = [];
            }
        });
    }
}
exports.DeclarationIndex = DeclarationIndex;
