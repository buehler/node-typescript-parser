"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Import that imports a whole namespace (i.e. import * as foobar from 'foobar';).
 *
 * @export
 * @class TsNamespaceImport
 * @implements {AliasedImport}
 */
class NamespaceImport {
    constructor(libraryName, alias, start, end) {
        this.libraryName = libraryName;
        this.alias = alias;
        this.start = start;
        this.end = end;
    }
    get isNew() {
        return this.start === undefined || this.end === undefined;
    }
    /**
     * Clone the current import object.
     *
     * @returns {NamespaceImport}
     *
     * @memberof NamespaceImport
     */
    clone() {
        return new NamespaceImport(this.libraryName, this.alias, this.start, this.end);
    }
}
exports.NamespaceImport = NamespaceImport;
