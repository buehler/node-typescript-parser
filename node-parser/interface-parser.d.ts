import { InterfaceDeclaration } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parses an interface node into its declaration.
 * Calculates the property and method defintions of the interface as well.
 *
 * @export
 * @param {Resource} resource
 * @param {InterfaceDeclaration} node
 */
export declare function parseInterface(resource: Resource, node: InterfaceDeclaration): void;
