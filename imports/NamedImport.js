"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic typescript import (ES6 style). Does contain multiple symbols of a file and converts
 * itself to a multiline import if the threshold is reached.
 * Can also contain a default import part.
 * (i.e. import {Foobar} from ...).
 *
 * @export
 * @class NamedImport
 * @implements {Import}
 */
class NamedImport {
    constructor(libraryName, start, end) {
        this.libraryName = libraryName;
        this.start = start;
        this.end = end;
        this.specifiers = [];
    }
    get isNew() {
        return this.start === undefined || this.end === undefined;
    }
    /**
     * Clone the current import object.
     *
     * @returns {NamedImport}
     *
     * @memberof NamedImport
     */
    clone() {
        const clone = new NamedImport(this.libraryName, this.start, this.end);
        clone.specifiers = this.specifiers.map(o => o.clone());
        clone.defaultAlias = this.defaultAlias;
        return clone;
    }
}
exports.NamedImport = NamedImport;
