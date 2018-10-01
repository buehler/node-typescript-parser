import { StringImport } from '../../imports/StringImport';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
/**
 * Generates typescript code for a string import.
 *
 * @export
 * @param {StringImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
export declare function generateStringImport(imp: StringImport, { stringQuoteStyle, eol }: TypescriptGenerationOptions): string;
