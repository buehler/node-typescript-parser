import { VariableStatement } from 'typescript';
import { CallableDeclaration } from '../declarations/Declaration';
import { Resource } from '../resources/Resource';
/**
 * Parse a variable. Information such as "is the variable const" are calculated here.
 *
 * @export
 * @param {(Resource | CallableDeclaration)} parent
 * @param {VariableStatement} node
 */
export declare function parseVariable(parent: Resource | CallableDeclaration, node: VariableStatement): void;
