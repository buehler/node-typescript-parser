"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates typescript code for a string import.
 *
 * @export
 * @param {StringImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
function generateStringImport(imp, { stringQuoteStyle, eol }) {
    return `import ${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;
}
exports.generateStringImport = generateStringImport;
