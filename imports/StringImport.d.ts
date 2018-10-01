import { Import } from './Import';
/**
 * Simple string import (i.e. import "reflect-metadata";).
 *
 * @export
 * @class StringImport
 * @implements {Import}
 */
export declare class StringImport implements Import {
    libraryName: string;
    start?: number | undefined;
    end?: number | undefined;
    readonly isNew: boolean;
    constructor(libraryName: string, start?: number | undefined, end?: number | undefined);
    /**
     * Clone the current import object.
     *
     * @returns {StringImport}
     *
     * @memberof StringImport
     */
    clone(): StringImport;
}
