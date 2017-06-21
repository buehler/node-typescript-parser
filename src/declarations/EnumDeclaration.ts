import { ExportableDeclaration } from './Declaration';

/**
 * Enum declaration.
 * 
 * @export
 * @class EnumDeclaration
 * @implements {ExportableDeclaration}
 */
export class EnumDeclaration implements ExportableDeclaration {
    public members: string[] = [];

    constructor(
        public name: string,
        public isExported: boolean,
        public start?: number,
        public end?: number,
    ) { }
}
