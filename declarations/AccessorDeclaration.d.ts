import { AbstractDeclaration, ScopedDeclaration, TypedDeclaration } from './Declaration';
import { DeclarationVisibility } from './DeclarationVisibility';
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
export declare abstract class AccessorDeclaration implements ScopedDeclaration, TypedDeclaration, AbstractDeclaration {
    name: string;
    visibility: DeclarationVisibility | undefined;
    type: string | undefined;
    isAbstract: boolean;
    start?: number | undefined;
    end?: number | undefined;
    constructor(name: string, visibility: DeclarationVisibility | undefined, type: string | undefined, isAbstract: boolean, start?: number | undefined, end?: number | undefined);
}
/**
 * Getter declaration for a getter accessor of a class property.
 *
 * @export
 * @class GetterDeclaration
 * @extends {AccessorDeclaration}
 */
export declare class GetterDeclaration extends AccessorDeclaration {
}
/**
 * Setter declaration for a getter accessor of a class property.
 *
 * @export
 * @class SetterDeclaration
 * @extends {AccessorDeclaration}
 */
export declare class SetterDeclaration extends AccessorDeclaration {
}
