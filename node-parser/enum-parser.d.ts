import { EnumDeclaration } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parses an enum node into the declaration.
 *
 * @export
 * @param {resource} resource
 * @param {EnumDeclaration} node
 */
export declare function parseEnum(resource: Resource, node: EnumDeclaration): void;
