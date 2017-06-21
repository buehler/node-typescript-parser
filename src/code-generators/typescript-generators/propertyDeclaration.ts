import { getVisibilityText } from '../../declarations/DeclarationVisibility';
import { PropertyDeclaration } from '../../declarations/PropertyDeclaration';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';

/**
 * Generates typescript code for a class property.
 * 
 * @export
 * @param {PropertyDeclaration} property 
 * @param {TypescriptGenerationOptions} { tabSize } 
 * @returns {string} 
 */
export function generatePropertyDeclaration(
    property: PropertyDeclaration,
    { tabSize }: TypescriptGenerationOptions,
): string {
    return `${Array(tabSize + 1).join(' ')}` +
            `${property.visibility !== undefined ? getVisibilityText(property.visibility) + ' ' : ''}` +
            `${property.name}${property.type ? `: ${property.type}` : ''};\n`;
}
