"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeclarationVisibility_1 = require("../../declarations/DeclarationVisibility");
const parameterDeclaration_1 = require("./parameterDeclaration");
/**
 * Generates typescript code for a method declaration.
 *
 * @export
 * @param {MethodDeclaration} method
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
function generateMethodDeclaration(method, { tabSize }) {
    const intend = Array(tabSize + 1).join(' ');
    return `${intend}` +
        `${method.visibility !== undefined ? DeclarationVisibility_1.getVisibilityText(method.visibility) + ' ' : ''}${method.name}(` +
        `${method.parameters.map(o => parameterDeclaration_1.generateParameterDeclaration(o)).join(', ')})` +
        `${method.type ? `: ${method.type}` : ''} {
${intend}${intend}throw new Error('Not implemented yet.');
${intend}}\n`;
}
exports.generateMethodDeclaration = generateMethodDeclaration;
