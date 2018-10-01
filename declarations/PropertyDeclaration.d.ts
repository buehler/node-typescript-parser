import { ScopedDeclaration, TypedDeclaration } from './Declaration';
import { DeclarationVisibility } from './DeclarationVisibility';
/**
 * Property declaration that contains its visibility.
 *
 * @export
 * @class PropertyDeclaration
 * @implements {ScopedDeclaration}
 * @implements {TypedDeclaration}
 */
export declare class PropertyDeclaration implements ScopedDeclaration, TypedDeclaration {
    name: string;
    visibility: DeclarationVisibility | undefined;
    type: string | undefined;
    start?: number | undefined;
    end?: number | undefined;
    constructor(name: string, visibility: DeclarationVisibility | undefined, type: string | undefined, start?: number | undefined, end?: number | undefined);
}
