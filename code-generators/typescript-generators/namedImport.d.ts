import { NamedImport } from '../../imports/NamedImport';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
/**
 * Generates typescript code for a named import.
 *
 * @export
 * @param {NamedImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
export declare function generateNamedImport(imp: NamedImport, { eol, stringQuoteStyle, spaceBraces, tabSize, wrapMethod, multiLineWrapThreshold, multiLineTrailingComma, insertSpaces, }: TypescriptGenerationOptions): string;
