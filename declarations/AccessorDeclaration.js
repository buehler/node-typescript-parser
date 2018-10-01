"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Property accessor declaration. This element represents the base and will be used in setters and getters.
 *
 * @export
 * @abstract
 * @class AccessorDeclaration
 * @implements {ScopedDeclaration}
 * @implements {TypedDeclaration}
 * @implements {AbstractDeclaration}
 */
class AccessorDeclaration {
    constructor(name, visibility, type, isAbstract, start, end) {
        this.name = name;
        this.visibility = visibility;
        this.type = type;
        this.isAbstract = isAbstract;
        this.start = start;
        this.end = end;
    }
}
exports.AccessorDeclaration = AccessorDeclaration;
/**
 * Getter declaration for a getter accessor of a class property.
 *
 * @export
 * @class GetterDeclaration
 * @extends {AccessorDeclaration}
 */
class GetterDeclaration extends AccessorDeclaration {
}
exports.GetterDeclaration = GetterDeclaration;
/**
 * Setter declaration for a getter accessor of a class property.
 *
 * @export
 * @class SetterDeclaration
 * @extends {AccessorDeclaration}
 */
class SetterDeclaration extends AccessorDeclaration {
}
exports.SetterDeclaration = SetterDeclaration;
