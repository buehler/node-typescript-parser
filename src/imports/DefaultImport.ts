import { AliasedImport } from './Import';

/**
 * Default import. Imports the default exports of a file.
 * (i.e. import foobar from ...).
 * 
 * @export
 * @class DefaultImport
 * @implements {AliasedImport}
 */
export class DefaultImport implements AliasedImport {
    public get isNew(): boolean {
        return this.start === undefined || this.end === undefined;
    }

    constructor(public libraryName: string, public alias: string, public start?: number, public end?: number) { }

    /**
     * Clone the current import object.
     * 
     * @returns {DefaultImport}
     * 
     * @memberof DefaultImport
     */
    public clone(): DefaultImport {
        return new DefaultImport(this.libraryName, this.alias, this.start, this.end);
    }
}
