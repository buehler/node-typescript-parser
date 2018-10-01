import { ArrayBindingPattern, ConstructorDeclaration, ExportDeclaration, ExternalModuleReference, FunctionDeclaration, GetAccessorDeclaration, Identifier, ImportDeclaration, ImportEqualsDeclaration, MethodDeclaration, MethodSignature, NamedExports, NamedImports, NamespaceImport, Node, ObjectBindingPattern, PropertyDeclaration, PropertySignature, SetAccessorDeclaration, StringLiteral } from 'typescript';
/**
 * Determines if the given node is an ImportDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ImportDeclaration}
 */
export declare function isImportDeclaration(node?: Node): node is ImportDeclaration;
/**
 * Determines if the given node is an ImportEqualsDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ImportEqualsDeclaration}
 */
export declare function isImportEqualsDeclaration(node?: Node): node is ImportEqualsDeclaration;
/**
 * Determines if the given node is a NamespaceImport.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is NamespaceImport}
 */
export declare function isNamespaceImport(node?: Node): node is NamespaceImport;
/**
 * Determines if the given node are NamedImports.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is NamedImports}
 */
export declare function isNamedImports(node?: Node): node is NamedImports;
/**
 * Determines if the given node are NamedExports.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is NamedExports}
 */
export declare function isNamedExports(node?: Node): node is NamedExports;
/**
 * Determines if the given node is a StringLiteral.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is StringLiteral}
 */
export declare function isStringLiteral(node?: Node): node is StringLiteral;
/**
 * Determines if the given node is an Identifier.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is Identifier}
 */
export declare function isIdentifier(node?: Node): node is Identifier;
/**
 * Determines if the given node is an ExternalModuleReference.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ExternalModuleReference}
 */
export declare function isExternalModuleReference(node?: Node): node is ExternalModuleReference;
/**
 * Determines if the given node is an ExportDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ExportDeclaration}
 */
export declare function isExportDeclaration(node?: Node): node is ExportDeclaration;
/**
 * Determines if the given node is an ObjectBindingPattern (i.e. let {x, y} = foo).
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ObjectBindingPattern}
 */
export declare function isObjectBindingPattern(node?: Node): node is ObjectBindingPattern;
/**
 * Determines if the given node is an ArrayBindingPattern (i.e. let [x, y] = foo).
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ArrayBindingPattern}
 */
export declare function isArrayBindingPattern(node?: Node): node is ArrayBindingPattern;
/**
 * Determines if the given node is a FunctionDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is FunctionDeclaration}
 */
export declare function isFunctionDeclaration(node?: Node): node is FunctionDeclaration;
/**
 * Determines if the given node is a MethodSignature.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is MethodSignature}
 */
export declare function isMethodSignature(node?: Node): node is MethodSignature;
/**
 * Determines if the given node is a PropertySignature.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is PropertySignature}
 */
export declare function isPropertySignature(node?: Node): node is PropertySignature;
/**
 * Determines if the given node is a MethodDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is MethodDeclaration}
 */
export declare function isMethodDeclaration(node?: Node): node is MethodDeclaration;
/**
 * Determines if the given node is a PropertyDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is PropertyDeclaration}
 */
export declare function isPropertyDeclaration(node?: Node): node is PropertyDeclaration;
/**
 * Determines if the given node is a ConstructorDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is ConstructorDeclaration}
 */
export declare function isConstructorDeclaration(node?: Node): node is ConstructorDeclaration;
/**
 * Determines if the given node is a isGetAccessorDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is isGetAccessorDeclaration}
 */
export declare function isGetAccessorDeclaration(node?: Node): node is GetAccessorDeclaration;
/**
 * Determines if the given node is a SetAccessorDeclaration.
 *
 * @export
 * @param {Node} [node]
 * @returns {node is SetAccessorDeclaration}
 */
export declare function isSetAccessorDeclaration(node?: Node): node is SetAccessorDeclaration;
