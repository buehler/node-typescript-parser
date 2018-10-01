"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
/**
 * Determines if the given node is an ImportDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ImportDeclaration}
 */
function isImportDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.ImportDeclaration;
}
exports.isImportDeclaration = isImportDeclaration;
/**
 * Determines if the given node is an ImportEqualsDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ImportEqualsDeclaration}
 */
function isImportEqualsDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.ImportEqualsDeclaration;
}
exports.isImportEqualsDeclaration = isImportEqualsDeclaration;
/**
 * Determines if the given node is a NamespaceImport.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is NamespaceImport}
 */
function isNamespaceImport(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.NamespaceImport;
}
exports.isNamespaceImport = isNamespaceImport;
/**
 * Determines if the given node are NamedImports.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is NamedImports}
 */
function isNamedImports(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.NamedImports;
}
exports.isNamedImports = isNamedImports;
/**
 * Determines if the given node are NamedExports.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is NamedExports}
 */
function isNamedExports(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.NamedExports;
}
exports.isNamedExports = isNamedExports;
/**
 * Determines if the given node is a StringLiteral.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is StringLiteral}
 */
function isStringLiteral(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.StringLiteral;
}
exports.isStringLiteral = isStringLiteral;
/**
 * Determines if the given node is an Identifier.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is Identifier}
 */
function isIdentifier(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.Identifier;
}
exports.isIdentifier = isIdentifier;
/**
 * Determines if the given node is an ExternalModuleReference.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ExternalModuleReference}
 */
function isExternalModuleReference(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.ExternalModuleReference;
}
exports.isExternalModuleReference = isExternalModuleReference;
/**
 * Determines if the given node is an ExportDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ExportDeclaration}
 */
function isExportDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.ExportDeclaration;
}
exports.isExportDeclaration = isExportDeclaration;
/**
 * Determines if the given node is an ObjectBindingPattern (i.e. let {x, y} = foo).
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ObjectBindingPattern}
 */
function isObjectBindingPattern(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.ObjectBindingPattern;
}
exports.isObjectBindingPattern = isObjectBindingPattern;
/**
 * Determines if the given node is an ArrayBindingPattern (i.e. let [x, y] = foo).
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ArrayBindingPattern}
 */
function isArrayBindingPattern(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.ArrayBindingPattern;
}
exports.isArrayBindingPattern = isArrayBindingPattern;
/**
 * Determines if the given node is a FunctionDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is FunctionDeclaration}
 */
function isFunctionDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.FunctionDeclaration;
}
exports.isFunctionDeclaration = isFunctionDeclaration;
/**
 * Determines if the given node is a MethodSignature.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is MethodSignature}
 */
function isMethodSignature(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.MethodSignature;
}
exports.isMethodSignature = isMethodSignature;
/**
 * Determines if the given node is a PropertySignature.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is PropertySignature}
 */
function isPropertySignature(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.PropertySignature;
}
exports.isPropertySignature = isPropertySignature;
/**
 * Determines if the given node is a MethodDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is MethodDeclaration}
 */
function isMethodDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.MethodDeclaration;
}
exports.isMethodDeclaration = isMethodDeclaration;
/**
 * Determines if the given node is a PropertyDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is PropertyDeclaration}
 */
function isPropertyDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.PropertyDeclaration;
}
exports.isPropertyDeclaration = isPropertyDeclaration;
/**
 * Determines if the given node is a ConstructorDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ConstructorDeclaration}
 */
function isConstructorDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.Constructor;
}
exports.isConstructorDeclaration = isConstructorDeclaration;
/**
 * Determines if the given node is a isGetAccessorDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is isGetAccessorDeclaration}
 */
function isGetAccessorDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.GetAccessor;
}
exports.isGetAccessorDeclaration = isGetAccessorDeclaration;
/**
 * Determines if the given node is a SetAccessorDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is SetAccessorDeclaration}
 */
function isSetAccessorDeclaration(node) {
    return node !== undefined && node.kind === typescript_1.SyntaxKind.SetAccessor;
}
exports.isSetAccessorDeclaration = isSetAccessorDeclaration;
