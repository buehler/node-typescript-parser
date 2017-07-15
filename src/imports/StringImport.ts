import { Import } from './Import';

/**
 * Simple string import (i.e. import "reflect-metadata";).
 * 
 * @export
 * @class StringImport
 * @implements {Import}
 */
export class StringImport implements Import {
    public get isNew(): boolean {
        return this.start === undefined || this.end === undefined;
    }

    constructor(public libraryName: string, public start?: number, public end?: number) { }

    /**
     * Clone the current import object.
     * 
     * @returns {StringImport}
     * 
     * @memberof StringImport
     */
    public clone(): StringImport {
        return new StringImport(this.libraryName, this.start, this.end);
    }
}
