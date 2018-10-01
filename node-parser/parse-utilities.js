"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const File_1 = require("../resources/File");
/**
 * Checks if the given typescript node has the exported flag.
 * (e.g. export class Foobar).
 *
 * @export
 * @param {Node} node
 * @returns {boolean}
 */
function isNodeExported(node) {
    const flags = typescript_1.getCombinedModifierFlags(node);
    return (flags & typescript_1.ModifierFlags.Export) === typescript_1.ModifierFlags.Export;
}
exports.isNodeExported = isNodeExported;
/**
 * Checks if the given typescript node has the default flag.
 * (e.g. export default class Foobar).
 *
 * @export
 * @param {Node} node
 * @returns {boolean}
 */
function isNodeDefaultExported(node) {
    const flags = typescript_1.getCombinedModifierFlags(node);
    return (flags & typescript_1.ModifierFlags.Default) === typescript_1.ModifierFlags.Default;
}
exports.isNodeDefaultExported = isNodeDefaultExported;
/**
 * Returns the type text (type information) for a given node.
 *
 * @export
 * @param {(TypeNode | undefined)} node
 * @returns {(string | undefined)}
 */
function getNodeType(node) {
    return node ? node.getText() : undefined;
}
exports.getNodeType = getNodeType;
/**
 * Returns the enum value (visibility) of a node.
 *
 * @export
 * @param {Node} node
 * @returns {(DeclarationVisibility | undefined)}
 */
function getNodeVisibility(node) {
    if (!node.modifiers) {
        return undefined;
    }
    for (const modifier of node.modifiers) {
        switch (modifier.kind) {
            case typescript_1.SyntaxKind.PublicKeyword:
                return 2 /* Public */;
            case typescript_1.SyntaxKind.ProtectedKeyword:
                return 1 /* Protected */;
            case typescript_1.SyntaxKind.PrivateKeyword:
                return 0 /* Private */;
            default:
                break;
        }
    }
}
exports.getNodeVisibility = getNodeVisibility;
/**
 * Function that calculates the default name of a resource.
 * This is used when a default export has no name (i.e. export class {}).
 *
 * @export
 * @param {TsResource} resource
 * @returns {string}
 */
function getDefaultResourceIdentifier(resource) {
    if (resource instanceof File_1.File && resource.isWorkspaceFile) {
        return resource.parsedPath.name;
    }
    return resource.identifier;
}
exports.getDefaultResourceIdentifier = getDefaultResourceIdentifier;
