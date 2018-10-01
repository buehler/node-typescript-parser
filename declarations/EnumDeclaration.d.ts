import { ExportableDeclaration } from './Declaration';
/**
 * Enum declaration.
 *
 * @export
 * @class EnumDeclaration
 * @implements {ExportableDeclaration}
 */
export declare class EnumDeclaration implements ExportableDeclaration {
    name: string;
    isExported: boolean;
    start?: number | undefined;
    end?: number | undefined;
    members: string[];
    constructor(name: string, isExported: boolean, start?: number | undefined, end?: number | undefined);
}
