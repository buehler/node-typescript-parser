"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum declaration.
 *
 * @export
 * @class EnumDeclaration
 * @implements {ExportableDeclaration}
 */
class EnumDeclaration {
    constructor(name, isExported, start, end) {
        this.name = name;
        this.isExported = isExported;
        this.start = start;
        this.end = end;
        this.members = [];
    }
}
exports.EnumDeclaration = EnumDeclaration;
