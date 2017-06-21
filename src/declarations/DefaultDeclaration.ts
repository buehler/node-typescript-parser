import { Resource } from '../resources/Resource';
import { Declaration, ExportableDeclaration } from './Declaration';

/**
 * Default declaration. Is used when a file exports something as its default.
 * Primary use is to ask the user about a name for the default export.
 * Is kind of an abstract declaration since there is no real declaration.
 * 
 * @export
 * @class DefaultDeclaration
 * @implements {ExportableDeclaration}
 */
export class DefaultDeclaration implements ExportableDeclaration {
    public readonly isExported: boolean = true;

    private exported: Declaration;

    public get exportedDeclaration(): Declaration {
        if (!this.exported) {
            this.exported = this.resource.declarations.find(o => o.name === this.name) !;
        }

        return this.exported;
    }

    constructor(
        public name: string,
        private resource: Resource,
        public start?: number,
        public end?: number,
    ) { }
}
