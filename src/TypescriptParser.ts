import { readFileSync } from 'fs';
import {
    ClassDeclaration,
    createSourceFile,
    EnumDeclaration,
    ExportAssignment,
    ExportDeclaration,
    FunctionDeclaration,
    Identifier,
    ImportDeclaration,
    ImportEqualsDeclaration,
    InterfaceDeclaration,
    ModuleDeclaration,
    Node,
    ScriptKind,
    ScriptTarget,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration,
    VariableStatement,
} from 'typescript';

import { parse } from 'path';
import { parseClass } from './node-parser/class-parser';
import { parseEnum } from './node-parser/enum-parser';
import { parseExport } from './node-parser/export-parser';
import { parseFunction } from './node-parser/function-parser';
import { parseIdentifier } from './node-parser/identifier-parser';
import { parseImport } from './node-parser/import-parser';
import { parseInterface } from './node-parser/interface-parser';
import { parseModule } from './node-parser/module-parser';
import { parseTypeAlias } from './node-parser/type-alias-parser';
import { parseVariable } from './node-parser/variable-parser';
import { File } from './resources/File';
import { Resource } from './resources/Resource';

/**
 * Magic.happens('here');
 * This class is the parser of the whole extension. It uses the typescript compiler to parse a file or given
 * source code into the token stream and therefore into the AST of the source. Afterwards an array of
 * resources is generated and returned.
 *
 * @export
 * @class TypescriptParser
 */
export class TypescriptParser {
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
    public async parseSource(source: string, scriptKind: ScriptKind = ScriptKind.TS): Promise<File> {
        return await this.parseTypescript(
            createSourceFile(
                'inline.tsx',
                source,
                ScriptTarget.ES2015,
                true,
                scriptKind),
            '/');
    }

    /**
     * Parses a single file into a parsed file.
     *
     * @param {string} filePath
     * @param {string} rootPath
     * @returns {Promise<File>}
     *
     * @memberof TsResourceParser
     */
    public async parseFile(filePath: string, rootPath: string): Promise<File> {
        const parse = await this.parseFiles([filePath], rootPath);
        return parse[0];
    }

    /**
     * Parses multiple files into parsed files.
     *
     * @param {string[]} filePathes
     * @param {string} rootPath
     * @returns {Promise<File[]>}
     *
     * @memberof TsResourceParser
     */
    public async parseFiles(
        filePathes: string[],
        rootPath: string): Promise<File[]> {
        return filePathes
            .map((o) => {
                let scriptKind: ScriptKind = ScriptKind.Unknown;
                const parsed = parse(o);
                switch (parsed.ext.toLowerCase()) {
                    case 'js':
                        scriptKind = ScriptKind.JS;
                        break;
                    case 'jsx':
                        scriptKind = ScriptKind.JSX;
                        break;
                    case 'ts':
                        scriptKind = ScriptKind.TS;
                        break;
                    case 'tsx':
                        scriptKind = ScriptKind.TSX;
                        break;
                }
                return createSourceFile(
                    o,
                    readFileSync(o).toString(),
                    ScriptTarget.ES2015,
                    true,
                    scriptKind,
                );
            })
            .map(o => this.parseTypescript(o, rootPath));
    }

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
    private parseTypescript(source: SourceFile, rootPath: string): File {
        const file = new File(source.fileName, rootPath, source.getStart(), source.getEnd());
        const syntaxList = source.getChildAt(0);

        this.parse(file, syntaxList);

        return file;
    }

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
    private parse(resource: Resource, node: Node): void {
        for (const child of node.getChildren()) {
            switch (child.kind) {
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                    parseImport(resource, <ImportDeclaration | ImportEqualsDeclaration>child);
                    break;
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.ExportAssignment:
                    parseExport(resource, <ExportAssignment | ExportDeclaration>child);
                    break;
                case SyntaxKind.EnumDeclaration:
                    parseEnum(resource, <EnumDeclaration>child);
                    break;
                case SyntaxKind.TypeAliasDeclaration:
                    parseTypeAlias(resource, <TypeAliasDeclaration>child);
                    break;
                case SyntaxKind.FunctionDeclaration:
                    parseFunction(resource, <FunctionDeclaration>child);
                    continue;
                case SyntaxKind.VariableStatement:
                    parseVariable(resource, <VariableStatement>child);
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    parseInterface(resource, <InterfaceDeclaration>child);
                    break;
                case SyntaxKind.ClassDeclaration:
                    parseClass(resource, <ClassDeclaration>child);
                    continue;
                case SyntaxKind.Identifier:
                    parseIdentifier(resource, <Identifier>child);
                    break;
                case SyntaxKind.ModuleDeclaration:
                    const newResource = parseModule(resource, <ModuleDeclaration>child);
                    this.parse(newResource, child);
                    continue;
                default:
                    break;
            }
            this.parse(resource, child);
        }
    }
}
