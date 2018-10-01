import { ModuleDeclaration } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parse a module to its declaration. Create a new namespace or module declaration and return it to
 * be used as the new "container".
 *
 * @export
 * @param {Resource} resource
 * @param {ModuleDeclaration} node
 * @returns {Resource}
 */
export declare function parseModule(resource: Resource, node: ModuleDeclaration): Resource;
