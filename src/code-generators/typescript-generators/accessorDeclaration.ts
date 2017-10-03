import { AccessorDeclaration, SetterDeclaration } from '../../declarations/AccessorDeclaration';
import { getVisibilityText } from '../../declarations/DeclarationVisibility';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';

/**
 * Generates typescript code for a class property accessor.
 *
 * @export
 * @param {AccessorDeclaration} accessor
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
export function generateAccessorDeclaration(
    accessor: AccessorDeclaration,
    { tabSize }: TypescriptGenerationOptions,
): string {
    const tabs = Array(tabSize + 1).join(' ');
    let definitionLine: string;
    if (accessor instanceof SetterDeclaration) {
        definitionLine = `${tabs}${accessor.visibility !== undefined ? getVisibilityText(accessor.visibility) + ' ' : ''}` +
            `${accessor.isAbstract ? 'abstract ' : ''}` +
            `set ${accessor.name}(value${accessor.type ? `: ${accessor.type}` : ''})`;
    } else {
        definitionLine = `${tabs}${accessor.visibility !== undefined ? getVisibilityText(accessor.visibility) + ' ' : ''}` +
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
