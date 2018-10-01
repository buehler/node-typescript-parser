import { MethodDeclaration } from '../../declarations/MethodDeclaration';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
/**
 * Generates typescript code for a method declaration.
 *
 * @export
 * @param {MethodDeclaration} method
 * @param {TypescriptGenerationOptions} { tabSize }
 * @returns {string}
 */
export declare function generateMethodDeclaration(method: MethodDeclaration, { tabSize }: TypescriptGenerationOptions): string;
