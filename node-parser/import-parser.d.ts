import { ImportDeclaration, ImportEqualsDeclaration } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parses an import node into the declaration.
 *
 * @export
 * @param {Resource} resource
 * @param {(ImportDeclaration | ImportEqualsDeclaration)} node
 */
export declare function parseImport(resource: Resource, node: ImportDeclaration | ImportEqualsDeclaration): void;
