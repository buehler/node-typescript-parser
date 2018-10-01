"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessorDeclaration_1 = require("../../declarations/AccessorDeclaration");
const DeclarationVisibility_1 = require("../../declarations/DeclarationVisibility");
/**
 * Generates typescript code for a class property accessor.
 *
 * @export
 * @param {AccessorDeclaration} accessor
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
function generateAccessorDeclaration(accessor, { tabSize }) {
    const tabs = Array(tabSize + 1).join(' ');
    let definitionLine;
    if (accessor instanceof AccessorDeclaration_1.SetterDeclaration) {
        definitionLine = `${tabs}${accessor.visibility !== undefined ? DeclarationVisibility_1.getVisibilityText(accessor.visibility) + ' ' : ''}` +
            `${accessor.isAbstract ? 'abstract ' : ''}` +
            `set ${accessor.name}(value${accessor.type ? `: ${accessor.type}` : ''})`;
    }
    else {
        definitionLine = `${tabs}${accessor.visibility !== undefined ? DeclarationVisibility_1.getVisibilityText(accessor.visibility) + ' ' : ''}` +
            `${accessor.isAbstract ? 'abstract ' : ''}` +
            `get ${accessor.name}()${accessor.type ? `: ${accessor.type}` : ''}`;
    }
    if (accessor.isAbstract) {
        return `${definitionLine};`;
    }
    return `${definitionLine} {
${tabs}${tabs}throw new Error('Not implemented yet.');
${tabs}}\n`;
}
exports.generateAccessorDeclaration = generateAccessorDeclaration;
