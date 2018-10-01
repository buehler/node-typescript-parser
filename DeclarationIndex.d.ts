import { DeclarationInfo } from './declarations/DeclarationInfo';
import { TypescriptParser } from './TypescriptParser';
/**
 * IndexDelta type, is calculated by the declaration index to give an overview, what has changed in the index.
 * Returns a list of deleted declarations, newly added declarations (with the corresponding infos) and
 * which declarations have been updated (with all declarations under that name).
 */
export declare type IndexDelta = {
    added: {
        [declaration: string]: DeclarationInfo[];
    };
    updated: {
        [declaration: string]: DeclarationInfo[];
    };
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
export declare class DeclarationIndex {
    private parser;
    private rootPath;
    private building;
    /**
     * Hash of parsed resources. Contains all parsed files / namespaces / declarations
     * of the current workspace.
     *
     * @private
     * @type {Resources}
     * @memberof DeclarationIndex
     */
    private parsedResources;
    /**
     * Declaration index. Reverse index from a name to many declarations assotiated to the name.
     *
     * @private
     * @type {({ [declaration: string]: DeclarationInfo[] } | undefined)}
     * @memberof DeclarationIndex
     */
    private _index;
    /**
     * Indicator if the first index was loaded and calculated or not.
     *
     * @readonly
     * @type {boolean}
     * @memberof DeclarationIndex
     */
    readonly indexReady: boolean;
    /**
     * Reverse index of the declarations.
     *
     * @readonly
     * @type {({ [declaration: string]: DeclarationInfo[] } | undefined)}
     * @memberof DeclarationIndex
     */
    readonly index: {
        [declaration: string]: DeclarationInfo[];
    } | undefined;
    /**
     * List of all declaration information. Contains the typescript declaration and the
     * "from" information (from where the symbol is imported).
     *
     * @readonly
     * @type {DeclarationInfo[]}
     * @memberof DeclarationIndex
     */
    readonly declarationInfos: DeclarationInfo[];
    constructor(parser: TypescriptParser, rootPath: string);
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
    static calculateIndexDelta(oldIndex: {
        [declaration: string]: DeclarationInfo[];
    }, newIndex: {
        [declaration: string]: DeclarationInfo[];
    }): IndexDelta;
    /**
     * Resets the whole index. Does delete everything. Period.
     * Is useful for unit testing or similar things.
     *
     * @memberof DeclarationIndex
     */
    reset(): void;
    /**
     * Tells the index to build a new index.
     * Can be canceled with a cancellationToken.
     *
     * @param {string[]} filePathes
     * @returns {Promise<void>}
     *
     * @memberof DeclarationIndex
     */
    buildIndex(filePathes: string[]): Promise<void>;
    /**
     * Is called when file events happen. Does reindex for the changed files and creates a new index.
     * Returns the differences for the new index.
     *
     * @param {FileEvent[]} changes
     * @returns {Promise<IndexDelta>}
     *
     * @memberof DeclarationIndex
     */
    reindexForChanges(changes: FileChanges): Promise<IndexDelta>;
    /**
     * Returns a list of files that export a certain resource (declaration).
     *
     * @private
     * @param {string} resourceToCheck
     * @returns {string[]}
     *
     * @memberof DeclarationIndex
     */
    private getExportedResources;
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
    private doesExportResource;
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
    private parseResources;
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
    private createIndex;
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
    private processResourceExports;
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
    private processAllFromExport;
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
    private processNamedFromExport;
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
    private processAssignedExport;
}
