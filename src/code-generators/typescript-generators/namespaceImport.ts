import { NamespaceImport } from '../../imports/NamespaceImport';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';

/**
 * Generates typescript code for a namespace import
 * 
 * @export
 * @param {NamespaceImport} imp 
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol } 
 * @returns {string} 
 */
export function generateNamespaceImport(
    imp: NamespaceImport,
    { stringQuoteStyle, eol }: TypescriptGenerationOptions,
): string {
    return `import * as ${imp.alias} from ${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;
}
