import { Identifier } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parses an identifier into a usage of a resource if the predicates are true.
 *
 * @export
 * @param {Resource} resource
 * @param {Identifier} node
 */
export declare function parseIdentifier(resource: Resource, node: Identifier): void;
