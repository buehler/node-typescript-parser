"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalModuleImport_1 = require("../imports/ExternalModuleImport");
const NamedImport_1 = require("../imports/NamedImport");
const NamespaceImport_1 = require("../imports/NamespaceImport");
const StringImport_1 = require("../imports/StringImport");
const SymbolSpecifier_1 = require("../SymbolSpecifier");
const TypescriptGuards_1 = require("../type-guards/TypescriptGuards");
/**
 * Parses an import node into the declaration.
 *
 * @export
 * @param {Resource} resource
 * @param {(ImportDeclaration | ImportEqualsDeclaration)} node
 */
function parseImport(resource, node) {
    if (TypescriptGuards_1.isImportDeclaration(node)) {
        if (node.importClause && TypescriptGuards_1.isNamespaceImport(node.importClause.namedBindings)) {
            const lib = node.moduleSpecifier;
            const alias = node.importClause.namedBindings.name;
            resource.imports.push(new NamespaceImport_1.NamespaceImport(lib.text, alias.text, node.getStart(), node.getEnd()));
        }
        else if (node.importClause && (TypescriptGuards_1.isNamedImports(node.importClause.namedBindings) || node.importClause.name)) {
            const lib = node.moduleSpecifier;
            const tsImport = new NamedImport_1.NamedImport(lib.text, node.getStart(), node.getEnd());
            if (node.importClause.name) {
                tsImport.defaultAlias = node.importClause.name.text;
            }
            if (node.importClause.namedBindings) {
                const bindings = node.importClause.namedBindings;
                tsImport.specifiers = bindings.elements.map(o => o.propertyName && o.name ?
                    new SymbolSpecifier_1.SymbolSpecifier(o.propertyName.text, o.name.text) :
                    new SymbolSpecifier_1.SymbolSpecifier(o.name.text));
                const defaultImport = tsImport.specifiers.find(imp => imp.specifier === 'default' && !!imp.alias);
                if (defaultImport) {
                    tsImport.specifiers.splice(tsImport.specifiers.indexOf(defaultImport), 1);
                    tsImport.defaultAlias = defaultImport.alias;
                }
            }
            resource.imports.push(tsImport);
        }
        else if (node.moduleSpecifier && TypescriptGuards_1.isStringLiteral(node.moduleSpecifier)) {
            const lib = node.moduleSpecifier;
            resource.imports.push(new StringImport_1.StringImport(lib.text, node.getStart(), node.getEnd()));
        }
    }
    else if (TypescriptGuards_1.isExternalModuleReference(node.moduleReference)) {
        const alias = node.name;
        const lib = node.moduleReference.expression;
        resource.imports.push(new ExternalModuleImport_1.ExternalModuleImport(lib.text, alias.text, node.getStart(), node.getEnd()));
    }
}
exports.parseImport = parseImport;
