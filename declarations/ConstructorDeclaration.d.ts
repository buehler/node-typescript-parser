import { CallableDeclaration } from './Declaration';
import { ParameterDeclaration } from './ParameterDeclaration';
import { VariableDeclaration } from './VariableDeclaration';
/**
 * Constructor declaration that is contained in a class.
 *
 * @export
 * @class ConstructorDeclaration
 * @implements {CallableDeclaration}
 */
export declare class ConstructorDeclaration implements CallableDeclaration {
    name: string;
    start?: number | undefined;
    end?: number | undefined;
    parameters: ParameterDeclaration[];
    variables: VariableDeclaration[];
    constructor(name: string, start?: number | undefined, end?: number | undefined);
}
