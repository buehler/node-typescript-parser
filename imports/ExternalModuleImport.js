"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Alternative to the namespace import. Can be used by various libraries.
 * (i.e. import foobar = require('foobar')).
 *
 * @export
 * @class ExternalModuleImport
 * @implements {AliasedImport}
 */
class ExternalModuleImport {
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
     * @returns {ExternalModuleImport}
     *
     * @memberof ExternalModuleImport
     */
    clone() {
        return new ExternalModuleImport(this.libraryName, this.alias, this.start, this.end);
    }
}
exports.ExternalModuleImport = ExternalModuleImport;
