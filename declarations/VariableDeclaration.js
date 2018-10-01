"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Variable declaration. Is contained in a method or function, or can be exported.
 *
 * @export
 * @class VariableDeclaration
 * @implements {ExportableDeclaration}
 * @implements {TypedDeclaration}
 */
class VariableDeclaration {
    constructor(name, isConst, isExported, type, start, end) {
        this.name = name;
        this.isConst = isConst;
        this.isExported = isExported;
        this.type = type;
        this.start = start;
        this.end = end;
    }
}
exports.VariableDeclaration = VariableDeclaration;
