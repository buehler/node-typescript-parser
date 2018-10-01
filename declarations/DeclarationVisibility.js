"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the visibility string for a given enum value.
 *
 * @param {DeclarationVisibility} [visibility]
 * @returns {string}
 */
function getVisibilityText(visibility) {
    switch (visibility) {
        case 0 /* Private */:
            return 'private';
        case 2 /* Public */:
            return 'public';
        case 1 /* Protected */:
            return 'protected';
        default:
            return '';
    }
}
exports.getVisibilityText = getVisibilityText;
