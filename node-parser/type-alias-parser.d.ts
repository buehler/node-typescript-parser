import { TypeAliasDeclaration } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parses a type alias into the declaration.
 *
 * @export
 * @param {Resource} resource
 * @param {TypeAliasDeclaration} node
 */
export declare function parseTypeAlias(resource: Resource, node: TypeAliasDeclaration): void;
