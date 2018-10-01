"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that defines information about a declaration.
 * Contains the declaration and the origin of the declaration.
 *
 * @export
 * @class DeclarationInfo
 */
class DeclarationInfo {
    constructor(declaration, from) {
        this.declaration = declaration;
        this.from = from;
    }
}
exports.DeclarationInfo = DeclarationInfo;
