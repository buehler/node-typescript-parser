"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a template from an expression string. The template can then be used to infuse stuff into the template.
 *
 * @export
 * @param {string[]} strings
 * @param {...number[]} keys
 * @returns {(...values: any[]) => string}
 */
function stringTemplate(strings, ...keys) {
    return (...values) => {
        const result = [strings[0]];
        keys.forEach((key, idx) => {
            result.push(values[key], strings[idx + 1]);
        });
        return result.join('');
    };
}
exports.stringTemplate = stringTemplate;
