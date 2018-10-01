/**
 * Returns the visibility string for a given enum value.
 *
 * @param {DeclarationVisibility} [visibility]
 * @returns {string}
 */
export declare function getVisibilityText(visibility?: DeclarationVisibility): string;
/**
 * Visibility of a class or interface property, as well as a method.
 *
 * @export
 * @enum {number}
 */
export declare const enum DeclarationVisibility {
    Private = 0,
    Protected = 1,
    Public = 2
}
