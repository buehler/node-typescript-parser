import { ExternalModuleImport } from '../../imports/ExternalModuleImport';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
/**
 * Generates typescript code for an external module import.
 *
 * @export
 * @param {ExternalModuleImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
export declare function generateExternalModuleImport(imp: ExternalModuleImport, { stringQuoteStyle, eol }: TypescriptGenerationOptions): string;
