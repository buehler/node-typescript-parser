"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Property declaration that contains its visibility.
 *
 * @export
 * @class PropertyDeclaration
 * @implements {ScopedDeclaration}
 * @implements {TypedDeclaration}
 */
class PropertyDeclaration {
    constructor(name, visibility, type, start, end) {
        this.name = name;
        this.visibility = visibility;
        this.type = type;
        this.start = start;
        this.end = end;
    }
}
exports.PropertyDeclaration = PropertyDeclaration;
