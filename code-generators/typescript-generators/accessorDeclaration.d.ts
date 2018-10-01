import { AccessorDeclaration } from '../../declarations/AccessorDeclaration';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
/**
 * Generates typescript code for a class property accessor.
 *
 * @export
 * @param {AccessorDeclaration} accessor
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
export declare function generateAccessorDeclaration(accessor: AccessorDeclaration, { tabSize }: TypescriptGenerationOptions): string;
