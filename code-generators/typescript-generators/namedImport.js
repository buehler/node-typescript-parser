"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringTemplate_1 = require("../../utilities/StringTemplate");
const TypescriptGenerationOptions_1 = require("../TypescriptGenerationOptions");
const symbolSpecifier_1 = require("./symbolSpecifier");
const oneLinerImportTemplate = StringTemplate_1.stringTemplate `import ${0} from ${1}`;
const multiLineImportTemplate = StringTemplate_1.stringTemplate `import ${3}{
${0}${1}
} from ${2}`;
const defaultAliasOnlyMultiLineImportTemplate = StringTemplate_1.stringTemplate `import ${0}
from ${1}`;
/**
 * Sort function for symbol specifiers. Does sort after the specifiers name (to lowercase).
 *
 * @param {SymbolSpecifier} i1
 * @param {SymbolSpecifier} i2
 * @returns {number}
 */
function specifierSort(i1, i2) {
    const strA = i1.specifier.toLowerCase();
    const strB = i2.specifier.toLowerCase();
    if (strA < strB) {
        return -1;
    }
    if (strA > strB) {
        return 1;
    }
    return 0;
}
/**
 * Generates typescript code for a named import.
 *
 * @export
 * @param {NamedImport} imp
 * @param {TypescriptGenerationOptions} { stringQuoteStyle, eol }
 * @returns {string}
 */
function generateNamedImport(imp, { eol, stringQuoteStyle, spaceBraces, tabSize, wrapMethod, multiLineWrapThreshold, multiLineTrailingComma, insertSpaces = true, }) {
    const lib = `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;
    // const specifiers = imp.specifiers.sort(specifierSort).map(o => generateSymbolSpecifier(o)).join(', ');
    const oneLinerImportStatement = oneLinerImportTemplate(getImportSpecifiers(imp, spaceBraces), lib);
    if (oneLinerImportStatement.length <= multiLineWrapThreshold &&
        (wrapMethod !== TypescriptGenerationOptions_1.MultiLineImportRule.strictlyOneImportPerLine ||
            imp.specifiers.length <= 1)) {
        return oneLinerImportStatement;
    }
    const defaultAliasOnly = imp.specifiers.length === 0;
    if (defaultAliasOnly) {
        return defaultAliasOnlyMultiLineImportTemplate(imp.defaultAlias ? `${imp.defaultAlias}, ` : '', `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`);
    }
    const sortedImportSpecifiers = imp.specifiers.sort(specifierSort);
    let importSpecifierStrings = '';
    const indent = insertSpaces ? Array(tabSize + 1).join(' ') : '\t';
    if (wrapMethod === TypescriptGenerationOptions_1.MultiLineImportRule.strictlyOneImportPerLine ||
        wrapMethod === TypescriptGenerationOptions_1.MultiLineImportRule.oneImportPerLineOnlyAfterThreshold) {
        importSpecifierStrings = sortedImportSpecifiers.map(o => `${indent}${symbolSpecifier_1.generateSymbolSpecifier(o)}`).join(',\n');
    }
    else if (wrapMethod === TypescriptGenerationOptions_1.MultiLineImportRule.multipleImportsPerLine) {
        importSpecifierStrings = sortedImportSpecifiers.reduce((acc, curr) => {
            const symbolSpecifier = symbolSpecifier_1.generateSymbolSpecifier(curr);
            // const dist: number = acc.out.length - acc.lastWrapOffset + symbolSpecifier.length;
            const importLines = acc.out.split('\n');
            const lastImportLine = importLines[importLines.length - 1];
            const dist = lastImportLine.length + `, `.length + symbolSpecifier.length;
            const needsWrap = dist >= multiLineWrapThreshold;
            return {
                out: acc.out + (needsWrap ? `,\n${indent}` : (acc.out.length ? `, ` : `${indent}`)) +
                    symbolSpecifier,
                lastWrapOffset: acc.lastWrapOffset + (needsWrap ? dist : 0),
            };
        }, {
            out: '',
            lastWrapOffset: 0,
        }).out;
    }
    return multiLineImportTemplate(importSpecifierStrings, multiLineTrailingComma ? ',' : '', `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`, imp.defaultAlias ? `${imp.defaultAlias}, ` : '');
}
exports.generateNamedImport = generateNamedImport;
function getImportSpecifiers(namedImport, spaceBraces) {
    if (namedImport.defaultAlias && namedImport.specifiers.length <= 0) {
        return namedImport.defaultAlias;
    }
    const space = spaceBraces ? ' ' : '';
    const specifiers = namedImport.specifiers.sort(specifierSort).map(o => symbolSpecifier_1.generateSymbolSpecifier(o)).join(', ');
    let importSpecifiers = `${space}${specifiers}${space}`;
    if (importSpecifiers.trim().length === 0) {
        importSpecifiers = ' ';
    }
    if (namedImport.defaultAlias && namedImport.specifiers.length > 0) {
        return `${namedImport.defaultAlias}, {${importSpecifiers}}`;
    }
    return `{${importSpecifiers}}`;
}
