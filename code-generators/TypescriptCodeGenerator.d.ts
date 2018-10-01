import { Declaration } from '../declarations/Declaration';
import { Export } from '../exports/Export';
import { Import } from '../imports/Import';
import { SymbolSpecifier } from '../SymbolSpecifier';
import { TypescriptGenerationOptions } from './TypescriptGenerationOptions';
/**
 * All generatable items combined. If the element is not generatable, the specific generator should throw
 * an exception.
 */
export declare type Generatable = Declaration | Import | Export | SymbolSpecifier;
/**
 * Type for generators.
 */
export declare type Generators = {
    [name: string]: (generatable: Generatable, options: TypescriptGenerationOptions) => string;
};
/**
 * Hash with all possible (yet implemented) generators.
 */
export declare const GENERATORS: Generators;
/**
 * Generator for typescript code elements. Takes a generatable object and tries to generate typescript code.
 *
 * @export
 * @class TypescriptCodeGenerator
 */
export declare class TypescriptCodeGenerator {
    private options;
    constructor(options: TypescriptGenerationOptions);
    /**
     * Generator function. Calls the specific element generator. If no generator is found, an exception is thrown.
     *
     * @param {Generatable} declaration
     * @returns {string}
     * @throws {NotGeneratableYetError}
     * @memberof TypescriptCodeGenerator
     */
    generate(declaration: Generatable): string;
}
