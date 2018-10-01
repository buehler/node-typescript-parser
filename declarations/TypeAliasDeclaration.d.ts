import { ExportableDeclaration } from './Declaration';
/**
 * Alias declaration that can be exported. Is used to defined types.
 * (e.g. type Foobar = { name: string };)
 *
 * @export
 * @class TypeAliasDeclaration
 * @implements {ExportableDeclaration}
 */
export declare class TypeAliasDeclaration implements ExportableDeclaration {
    name: string;
    isExported: boolean;
    start?: number | undefined;
    end?: number | undefined;
    constructor(name: string, isExported: boolean, start?: number | undefined, end?: number | undefined);
}
