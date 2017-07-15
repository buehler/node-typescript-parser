import { AliasedImport } from './Import';

/**
 * Alternative to the namespace import. Can be used by various libraries.
 * (i.e. import foobar = require('foobar')).
 * 
 * @export
 * @class ExternalModuleImport
 * @implements {AliasedImport}
 */
export class ExternalModuleImport implements AliasedImport {
    public get isNew(): boolean {
        return this.start === undefined || this.end === undefined;
    }

    constructor(public libraryName: string, public alias: string, public start?: number, public end?: number) { }

    /**
     * Clone the current import object.
     * 
     * @returns {ExternalModuleImport}
     * 
     * @memberof ExternalModuleImport
     */
    public clone(): ExternalModuleImport {
        return new ExternalModuleImport(this.libraryName, this.alias, this.start, this.end);
    }
}
