import { AliasedImport } from './Import';

/**
 * Import that imports a whole namespace (i.e. import * as foobar from 'foobar';).
 * 
 * @export
 * @class TsNamespaceImport
 * @implements {AliasedImport}
 */
export class NamespaceImport implements AliasedImport {
    public get isNew(): boolean {
        return this.start === undefined || this.end === undefined;
    }

    constructor(public libraryName: string, public alias: string, public start?: number, public end?: number) { }

    /**
     * Clone the current import object.
     * 
     * @returns {NamespaceImport}
     * 
     * @memberof NamespaceImport
     */
    public clone(): NamespaceImport {
        return new NamespaceImport(this.libraryName, this.alias, this.start, this.end);
    }
}
