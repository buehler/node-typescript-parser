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
export declare function generatePropertyDeclaration(property: PropertyDeclaration, { tabSize }: TypescriptGenerationOptions): string;
