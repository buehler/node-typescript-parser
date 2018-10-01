import { ExportAssignment, ExportDeclaration } from 'typescript';
import { Resource } from '../resources/Resource';
/**
 * Parses an export node into the declaration.
 *
 * @export
 * @param {Resource} resource
 * @param {(ExportDeclaration | ExportAssignment)} node
 */
export declare function parseExport(resource: Resource, node: ExportDeclaration | ExportAssignment): void;
