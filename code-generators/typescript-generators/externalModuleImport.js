"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates typescript code for an external module import.
 *
 * @export
 * @param {ExternalModuleImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
function generateExternalModuleImport(imp, { stringQuoteStyle, eol }) {
    return `import ${imp.alias} = require(${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle})${eol}`;
}
exports.generateExternalModuleImport = generateExternalModuleImport;
