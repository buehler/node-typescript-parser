import { TypeAliasDeclaration } from 'typescript';

import { TypeAliasDeclaration as TshType } from '../declarations/TypeAliasDeclaration';
import { Resource } from '../resources/Resource';
import { isNodeExported } from './parse-utilities';

/**
 * Parses a type alias into the declaration.
 * 
 * @export
 * @param {Resource} resource
 * @param {TypeAliasDeclaration} node
 */
export function parseTypeAlias(resource: Resource, node: TypeAliasDeclaration): void {
    resource.declarations.push(
        new TshType(node.name.text, isNodeExported(node), node.getStart(), node.getEnd()),
    );
}
