import { AbstractDeclaration, ScopedDeclaration, StaticDeclaration, TypedDeclaration } from './Declaration';
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
export abstract class AccessorDeclaration implements
    ScopedDeclaration,
    StaticDeclaration,
    TypedDeclaration,
    AbstractDeclaration {
    constructor(
        public name: string,
        public visibility: DeclarationVisibility | undefined,
        public type: string | undefined,
        public isAbstract: boolean,
        public isStatic: boolean,
        public start?: number,
        public end?: number,
    ) { }
}

/**
 * Getter declaration for a getter accessor of a class property.
 *
 * @export
 * @class GetterDeclaration
 * @extends {AccessorDeclaration}
 */
export class GetterDeclaration extends AccessorDeclaration { }

/**
 * Setter declaration for a getter accessor of a class property.
 *
 * @export
 * @class SetterDeclaration
 * @extends {AccessorDeclaration}
 */
export class SetterDeclaration extends AccessorDeclaration { }
