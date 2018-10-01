import { ExportableDeclaration, TypedDeclaration } from './Declaration';
/**
 * Variable declaration. Is contained in a method or function, or can be exported.
 *
 * @export
 * @class VariableDeclaration
 * @implements {ExportableDeclaration}
 * @implements {TypedDeclaration}
 */
export declare class VariableDeclaration implements ExportableDeclaration, TypedDeclaration {
    name: string;
    isConst: boolean;
    isExported: boolean;
    type: string | undefined;
    start?: number | undefined;
    end?: number | undefined;
    constructor(name: string, isConst: boolean, isExported: boolean, type: string | undefined, start?: number | undefined, end?: number | undefined);
}
