"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates typescript code for a namespace import
 *
 * @export
 * @param {NamespaceImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
function generateNamespaceImport(imp, { stringQuoteStyle, eol }) {
    return `import * as ${imp.alias} from ${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;
}
exports.generateNamespaceImport = generateNamespaceImport;
