/**
 * Creates a template from an expression string. The template can then be used to infuse stuff into the template.
 *
 * @export
 * @param {string[]} strings
 * @param {...number[]} keys
 * @returns {(...values: any[]) => string}
 */
export declare function stringTemplate(strings: TemplateStringsArray, ...keys: number[]): (...values: any[]) => string;
