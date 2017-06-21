import { ExportableDeclaration, TypedDeclaration } from './Declaration';

/**
 * Variable declaration. Is contained in a method or function, or can be exported.
 * 
 * @export
 * @class VariableDeclaration
 * @implements {ExportableDeclaration}
 * @implements {TypedDeclaration}
 */
export class VariableDeclaration implements ExportableDeclaration, TypedDeclaration {
    constructor(
        public name: string,
        public isConst: boolean,
        public isExported: boolean,
        public type: string | undefined,
        public start?: number,
        public end?: number,
    ) { }
}
