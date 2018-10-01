import { AliasedImport } from './Import';
/**
 * Import that imports a whole namespace (i.e. import * as foobar from 'foobar';).
 *
 * @export
 * @class TsNamespaceImport
 * @implements {AliasedImport}
 */
export declare class NamespaceImport implements AliasedImport {
    libraryName: string;
    alias: string;
    start?: number | undefined;
    end?: number | undefined;
    readonly isNew: boolean;
    constructor(libraryName: string, alias: string, start?: number | undefined, end?: number | undefined);
    /**
     * Clone the current import object.
     *
     * @returns {NamespaceImport}
     *
     * @memberof NamespaceImport
     */
    clone(): NamespaceImport;
}
