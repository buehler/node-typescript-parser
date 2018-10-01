"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default declaration. Is used when a file exports something as its default.
 * Primary use is to ask the user about a name for the default export.
 * Is kind of an abstract declaration since there is no real declaration.
 *
 * @export
 * @class DefaultDeclaration
 * @implements {ExportableDeclaration}
 */
class DefaultDeclaration {
    constructor(name, resource, start, end) {
        this.name = name;
        this.resource = resource;
        this.start = start;
        this.end = end;
        this.isExported = true;
    }
    get exportedDeclaration() {
        if (!this.exported) {
            this.exported = this.resource.declarations.find(o => o.name === this.name);
        }
        return this.exported;
    }
}
exports.DefaultDeclaration = DefaultDeclaration;
