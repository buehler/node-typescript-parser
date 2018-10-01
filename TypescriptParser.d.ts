import { ScriptKind } from 'typescript';
import { File } from './resources/File';
/**
 * Magic.happens('here');
 * This class is the parser of the whole extension. It uses the typescript compiler to parse a file or given
 * source code into the token stream and therefore into the AST of the source. Afterwards an array of
 * resources is generated and returned.
 *
 * @export
 * @class TypescriptParser
 */
export declare class TypescriptParser {
    /**
     * Parses the given source into an anonymous File resource.
     * Mainly used to parse source code of a document.
     *
     * @param {string} source
     * @param {ScriptKind} [scriptKind=ScriptKind.TS]
     * @returns {Promise<File>}
     *
     * @memberof TsResourceParser
     */
    parseSource(source: string, scriptKind?: ScriptKind): Promise<File>;
    /**
     * Parses a single file into a parsed file.
     *
     * @param {string} filePath
     * @param {string} rootPath
     * @returns {Promise<File>}
     *
     * @memberof TsResourceParser
     */
    parseFile(filePath: string, rootPath: string): Promise<File>;
    /**
     * Parses multiple files into parsed files.
     *
     * @param {string[]} filePathes
     * @param {string} rootPath
     * @returns {Promise<File[]>}
     *
     * @memberof TsResourceParser
     */
    parseFiles(filePathes: string[], rootPath: string): Promise<File[]>;
    /**
     * Parses the typescript source into the file instance. Calls .parse afterwards to
     * get the declarations and other information about the source.
     *
     * @private
     * @param {SourceFile} source
     * @param {string} rootPath
     * @returns {TsFile}
     *
     * @memberof TsResourceParser
     */
    private parseTypescript;
    /**
     * Recursive function that runs through the AST of a source and parses the nodes.
     * Creates the class / function / etc declarations and instanciates a new module / namespace
     * resource if needed.
     *
     * @private
     * @param {Resource} resource
     * @param {Node} node
     *
     * @memberof TsResourceParser
     */
    private parse;
}
