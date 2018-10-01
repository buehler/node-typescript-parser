"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function declaration. Like the MethodDeclaration it contains the base info about the function
 * and additional stuff.
 *
 * @export
 * @class FunctionDeclaration
 * @implements {CallableDeclaration}
 * @implements {ExportableDeclaration}
 */
class FunctionDeclaration {
    constructor(name, isExported, type, start, end) {
        this.name = name;
        this.isExported = isExported;
        this.type = type;
        this.start = start;
        this.end = end;
        this.parameters = [];
        this.variables = [];
        this.typeArguments = [];
    }
}
exports.FunctionDeclaration = FunctionDeclaration;
