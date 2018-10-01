import { TypedDeclaration } from './Declaration';
/**
 * Parameter declaration. Is contained in a method or function delaration since a parameter can not be exported
 * by itself.
 *
 * @export
 * @class ParameterDeclaration
 * @implements {TypedDeclaration}
 */
export declare class ParameterDeclaration implements TypedDeclaration {
    name: string;
    type: any | undefined;
    start?: number | undefined;
    end?: number | undefined;
    constructor(name: string, type: any | undefined, start?: number | undefined, end?: number | undefined);
}
