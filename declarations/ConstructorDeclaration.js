"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Constructor declaration that is contained in a class.
 *
 * @export
 * @class ConstructorDeclaration
 * @implements {CallableDeclaration}
 */
class ConstructorDeclaration {
    constructor(name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.parameters = [];
        this.variables = [];
    }
}
exports.ConstructorDeclaration = ConstructorDeclaration;
