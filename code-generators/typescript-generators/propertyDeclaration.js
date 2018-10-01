"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeclarationVisibility_1 = require("../../declarations/DeclarationVisibility");
/**
 * Generates typescript code for a class property.
 *
 * @export
 * @param {PropertyDeclaration} property
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
function generatePropertyDeclaration(property, { tabSize }) {
    return `${Array(tabSize + 1).join(' ')}` +
        `${property.visibility !== undefined ? DeclarationVisibility_1.getVisibilityText(property.visibility) + ' ' : ''}` +
        `${property.name}${property.type ? `: ${property.type}` : ''};\n`;
}
exports.generatePropertyDeclaration = generatePropertyDeclaration;
