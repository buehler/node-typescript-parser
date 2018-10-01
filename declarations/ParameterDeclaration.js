"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parameter declaration. Is contained in a method or function delaration since a parameter can not be exported
 * by itself.
 *
 * @export
 * @class ParameterDeclaration
 * @implements {TypedDeclaration}
 */
class ParameterDeclaration {
    constructor(name, type, start, end) {
        this.name = name;
        this.type = type;
        this.start = start;
        this.end = end;
    }
}
exports.ParameterDeclaration = ParameterDeclaration;
