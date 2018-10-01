"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method declaration. A method is contained in an interface or a class.
 * Contains information abount the method itself.
 *
 * @export
 * @class MethodDeclaration
 * @implements {CallableDeclaration}
 * @implements {ScopedDeclaration}
 * @implements {TypedDeclaration}
 */
class MethodDeclaration {
    constructor(name, isAbstract, visibility, type, start, end) {
        this.name = name;
        this.isAbstract = isAbstract;
        this.visibility = visibility;
        this.type = type;
        this.start = start;
        this.end = end;
        this.parameters = [];
        this.variables = [];
    }
}
exports.MethodDeclaration = MethodDeclaration;
