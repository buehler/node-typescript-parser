"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple string import (i.e. import "reflect-metadata";).
 *
 * @export
 * @class StringImport
 * @implements {Import}
 */
class StringImport {
    constructor(libraryName, start, end) {
        this.libraryName = libraryName;
        this.start = start;
        this.end = end;
    }
    get isNew() {
        return this.start === undefined || this.end === undefined;
    }
    /**
     * Clone the current import object.
     *
     * @returns {StringImport}
     *
     * @memberof StringImport
     */
    clone() {
        return new StringImport(this.libraryName, this.start, this.end);
    }
}
exports.StringImport = StringImport;
