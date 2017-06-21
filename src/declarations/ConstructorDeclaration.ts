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
export class ConstructorDeclaration implements CallableDeclaration {
    public parameters: ParameterDeclaration[] = [];
    public variables: VariableDeclaration[] = [];

    constructor(
        public name: string,
        public start?: number,
        public end?: number,
    ) { }
}
