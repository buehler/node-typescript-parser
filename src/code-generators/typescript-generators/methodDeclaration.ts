import { getVisibilityText } from '../../declarations/DeclarationVisibility';
import { MethodDeclaration } from '../../declarations/MethodDeclaration';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
import { generateParameterDeclaration } from './parameterDeclaration';

/**
 * Generates typescript code for a method declaration.
 *
 * @export
 * @param {MethodDeclaration} method
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
export function generateMethodDeclaration(method: MethodDeclaration, { tabSize }: TypescriptGenerationOptions): string {
    const intend = Array(tabSize + 1).join(' ');
    return `${intend}` +
        `${method.visibility !== undefined ? getVisibilityText(method.visibility) + ' ' : ''}${method.name}(` +
        `${method.parameters.map(o => generateParameterDeclaration(o)).join(', ')})` +
        `${method.type ? `: ${method.type}` : ''} {
${intend}${intend}throw new Error('Not implemented yet.');
${intend}}\n`;
}
