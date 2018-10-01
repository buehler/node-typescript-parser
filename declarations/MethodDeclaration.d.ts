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
export declare class MethodDeclaration implements AbstractDeclaration, CallableDeclaration, ScopedDeclaration, TypedDeclaration {
    name: string;
    isAbstract: boolean;
    visibility: DeclarationVisibility | undefined;
    type: string | undefined;
    start?: number | undefined;
    end?: number | undefined;
    parameters: ParameterDeclaration[];
    variables: VariableDeclaration[];
    constructor(name: string, isAbstract: boolean, visibility: DeclarationVisibility | undefined, type: string | undefined, start?: number | undefined, end?: number | undefined);
}
