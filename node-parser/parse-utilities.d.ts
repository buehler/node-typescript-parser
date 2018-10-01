import { Node, TypeNode } from 'typescript';
import { DeclarationVisibility } from '../declarations/DeclarationVisibility';
import { Resource } from '../resources/Resource';
/**
 * Checks if the given typescript node has the exported flag.
 * (e.g. export class Foobar).
 *
 * @export
 * @param {Node} node
 * @returns {boolean}
 */
export declare function isNodeExported(node: Node): boolean;
/**
 * Checks if the given typescript node has the default flag.
 * (e.g. export default class Foobar).
 *
 * @export
 * @param {Node} node
 * @returns {boolean}
 */
export declare function isNodeDefaultExported(node: Node): boolean;
/**
 * Returns the type text (type information) for a given node.
 *
 * @export
 * @param {(TypeNode | undefined)} node
 * @returns {(string | undefined)}
 */
export declare function getNodeType(node: TypeNode | undefined): string | undefined;
/**
 * Returns the enum value (visibility) of a node.
 *
 * @export
 * @param {Node} node
 * @returns {(DeclarationVisibility | undefined)}
 */
export declare function getNodeVisibility(node: Node): DeclarationVisibility | undefined;
/**
 * Function that calculates the default name of a resource.
 * This is used when a default export has no name (i.e. export class {}).
 *
 * @export
 * @param {TsResource} resource
 * @returns {string}
 */
export declare function getDefaultResourceIdentifier(resource: Resource): string;
