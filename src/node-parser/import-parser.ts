import {
    ExternalModuleReference,
    Identifier,
    ImportDeclaration,
    ImportEqualsDeclaration,
    NamedImports,
    NamespaceImport as TsNamespaceImport,
    StringLiteral,
} from 'typescript';

import { ExternalModuleImport } from '../imports/ExternalModuleImport';
import { NamedImport } from '../imports/NamedImport';
import { NamespaceImport } from '../imports/NamespaceImport';
import { StringImport } from '../imports/StringImport';
import { Resource } from '../resources/Resource';
import { SymbolSpecifier } from '../SymbolSpecifier';
import {
    isExternalModuleReference,
    isImportDeclaration,
    isNamedImports,
    isNamespaceImport,
    isStringLiteral,
} from '../type-guards/TypescriptGuards';

/**
 * Parses an import node into the declaration.
 *
 * @export
 * @param {Resource} resource
 * @param {(ImportDeclaration | ImportEqualsDeclaration)} node
 */
export function parseImport(resource: Resource, node: ImportDeclaration | ImportEqualsDeclaration): void {
    if (isImportDeclaration(node)) {
        if (node.importClause && isNamespaceImport(node.importClause.namedBindings)) {
            const lib = node.moduleSpecifier as StringLiteral;
            const alias = (node.importClause.namedBindings as TsNamespaceImport).name as Identifier;

            resource.imports.push(new NamespaceImport(lib.text, alias.text, node.getStart(), node.getEnd()));
        } else if (node.importClause && (isNamedImports(node.importClause.namedBindings) || node.importClause.name)) {
            const lib = node.moduleSpecifier as StringLiteral;
            const tsImport = new NamedImport(lib.text, node.getStart(), node.getEnd());

            if (node.importClause.name) {
                tsImport.defaultAlias = node.importClause.name.text;
            }

            if (node.importClause.namedBindings) {
                const bindings = node.importClause.namedBindings as NamedImports;

                tsImport.specifiers = bindings.elements.map(
                    o => o.propertyName && o.name ?
                        new SymbolSpecifier(o.propertyName.text, o.name.text) :
                        new SymbolSpecifier(o.name.text),
                );

                const defaultImport = tsImport.specifiers.find(imp => imp.specifier === 'default' && !!imp.alias);
                if (defaultImport) {
                    tsImport.specifiers.splice(tsImport.specifiers.indexOf(defaultImport), 1);
                    tsImport.defaultAlias = defaultImport.alias;
                }
            }

            resource.imports.push(tsImport);
        } else if (node.moduleSpecifier && isStringLiteral(node.moduleSpecifier)) {
            const lib = node.moduleSpecifier as StringLiteral;
            resource.imports.push(new StringImport(lib.text, node.getStart(), node.getEnd()));
        }
    } else if (isExternalModuleReference(node.moduleReference)) {
        const alias = node.name;
        const lib = (node.moduleReference as ExternalModuleReference).expression as Identifier;

        resource.imports.push(new ExternalModuleImport(lib.text, alias.text, node.getStart(), node.getEnd()));
    }
}
