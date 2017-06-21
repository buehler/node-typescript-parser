import { DefaultImport } from '../../imports/DefaultImport';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';

/**
 * Generates typescript code for a default import.
 * 
 * @export
 * @param {DefaultImport} imp 
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol } 
 * @returns {string} 
 */
export function generateDefaultImport(imp: DefaultImport, { stringQuoteStyle, eol }: TypescriptGenerationOptions): string {
    return `import ${imp.alias} from ${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;
}
