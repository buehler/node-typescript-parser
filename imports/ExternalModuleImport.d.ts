import { AliasedImport } from './Import';
/**
 * Alternative to the namespace import. Can be used by various libraries.
 * (i.e. import foobar = require('foobar')).
 *
 * @export
 * @class ExternalModuleImport
 * @implements {AliasedImport}
 */
export declare class ExternalModuleImport implements AliasedImport {
    libraryName: string;
    alias: string;
    start?: number | undefined;
    end?: number | undefined;
    readonly isNew: boolean;
    constructor(libraryName: string, alias: string, start?: number | undefined, end?: number | undefined);
    /**
     * Clone the current import object.
     *
     * @returns {ExternalModuleImport}
     *
     * @memberof ExternalModuleImport
     */
    clone(): ExternalModuleImport;
}
