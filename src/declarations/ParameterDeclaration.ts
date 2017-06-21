import { TypedDeclaration } from './Declaration';

/**
 * Parameter declaration. Is contained in a method or function delaration since a parameter can not be exported
 * by itself.
 * 
 * @export
 * @class ParameterDeclaration
 * @implements {TypedDeclaration}
 */
export class ParameterDeclaration implements TypedDeclaration {
    constructor(public name: string, public type: string | undefined, public start?: number, public end?: number) { }
}
