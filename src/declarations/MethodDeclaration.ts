import {
    AbstractDeclaration,
    AsyncDeclaration,
    CallableDeclaration,
    OptionalDeclaration,
    ScopedDeclaration,
    StaticDeclaration,
    TypedDeclaration,
} from './Declaration';
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
export class MethodDeclaration implements
    AbstractDeclaration,
    AsyncDeclaration,
    CallableDeclaration,
    OptionalDeclaration,
    ScopedDeclaration,
    StaticDeclaration,
    TypedDeclaration {

    public parameters: ParameterDeclaration[] = [];
    public variables: VariableDeclaration[] = [];

    constructor(
        public name: string,
        public isAbstract: boolean,
        public visibility: DeclarationVisibility | undefined,
        public type: string | undefined,
        public isOptional: boolean,
        public isStatic: boolean,
        public isAsync: boolean,
        public start?: number,
        public end?: number,
    ) { }
}
