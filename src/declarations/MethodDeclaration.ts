import { AbstractDeclaration, CallableDeclaration, ScopedDeclaration, TypedDeclaration } from './Declaration';
import { DeclarationVisibility } from './DeclarationVisibility';
import { ParameterDeclaration } from './ParameterDeclaration';
import { VariableDeclaration } from './VariableDeclaration';

/**
 * Method declaration. A method is contained in an interface or a class.
 * Contains information abount the method itself.
 * 
 * @export
 * @class MethodDeclaration
 * @implements {CallableDeclaration}
 * @implements {ScopedDeclaration}
 * @implements {TypedDeclaration}
 */
export class MethodDeclaration implements AbstractDeclaration, CallableDeclaration, ScopedDeclaration, TypedDeclaration {
    public parameters: ParameterDeclaration[] = [];
    public variables: VariableDeclaration[] = [];

    constructor(
        public name: string,
        public isAbstract: boolean,
        public visibility: DeclarationVisibility | undefined,
        public type: string | undefined,
        public start?: number,
        public end?: number,
    ) { }
}
