"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Interface declaration that contains defined properties and methods.
 *
 * @export
 * @class InterfaceDeclaration
 * @implements {ExportableDeclaration}
 * @implements {GenericDeclaration}
 */
class InterfaceDeclaration {
    constructor(name, isExported, start, end) {
        this.name = name;
        this.isExported = isExported;
        this.start = start;
        this.end = end;
        this.properties = [];
        this.methods = [];
    }
}
exports.InterfaceDeclaration = InterfaceDeclaration;
