import { VariableDeclaration } from '../../declarations/VariableDeclaration';

/**
 * Generates typescript code for a variable.
 * 
 * @export
 * @param {VariableDelcaration} variable 
 * @returns {string} 
 */
export function generateVariableDelcaration(variable: VariableDeclaration): string {
    return `${variable.name}${variable.type ? `: ${variable.type}` : ''}`;
}
