import { ParameterDeclaration } from '../../declarations/ParameterDeclaration';

/**
 * Generates typescript code for parameters.
 * 
 * @export
 * @param {ParameterDeclaration} parameter 
 * @returns {string} 
 */
export function generateParameterDeclaration(parameter: ParameterDeclaration): string {
    return `${parameter.name}${parameter.type ? `: ${parameter.type}` : ''}`;
}
