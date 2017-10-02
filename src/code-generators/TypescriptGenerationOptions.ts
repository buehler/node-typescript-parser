/**
 * Typescript generation options type. Contains all information needed to stringify some objects to typescript.
 *
 * @export
 * @interface TypescriptGenerationOptions
 */
export interface TypescriptGenerationOptions {
    /**
     * Which quote type should be used (' or ").
     *
     * @type {string}
     * @memberof TypescriptGenerationOptions
     */
    stringQuoteStyle: string;

    /**
     * Defines end of line character (semicolon or nothing).
     *
     * @type {('' | ';')}
     * @memberof TypescriptGenerationOptions
     */
    eol: '' | ';';

    /**
     * Defines if the symbols should have spacing in the braces ({ Foo } or {Foo}).
     *
     * @type {boolean}
     * @memberof TypescriptGenerationOptions
     */
    spaceBraces: boolean;

    /**
     * The threshold where an import is written as multiline.
     *
     * @type {number}
     * @memberof TypescriptGenerationOptions
     */
    multiLineWrapThreshold: number;

    /**
     * Defines if the last line of a multiline import should have a comma.
     *
     * @type {boolean}
     * @memberof TypescriptGenerationOptions
     */
    multiLineTrailingComma: boolean;

    /**
     * How many spaces of indentiation.
     *
     * @type {number}
     * @memberof TypescriptGenerationOptions
     */
    tabSize: number;
}
