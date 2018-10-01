import { CallableDeclaration, ExportableDeclaration } from './Declaration';
import { ParameterDeclaration } from './ParameterDeclaration';
import { VariableDeclaration } from './VariableDeclaration';
/**
 * Function declaration. Like the MethodDeclaration it contains the base info about the function
 * and additional stuff.
 *
 * @export
 * @class FunctionDeclaration
 * @implements {CallableDeclaration}
 * @implements {ExportableDeclaration}
 */
export declare class FunctionDeclaration implements CallableDeclaration, ExportableDeclaration {
    name: string;
    isExported: boolean;
    type?: string | undefined;
    start?: number | undefined;
    end?: number | undefined;
    parameters: ParameterDeclaration[];
    variables: VariableDeclaration[];
    typeArguments: ParameterDeclaration[];
    constructor(name: string, isExported: boolean, type?: string | undefined, start?: number | undefined, end?: number | undefined);
}
