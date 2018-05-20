import { NamedImport } from '../../imports/NamedImport';
import { SymbolSpecifier } from '../../SymbolSpecifier';
import { stringTemplate } from '../../utilities/StringTemplate';
import { MultiLineImportRule, TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
import { generateSymbolSpecifier } from './symbolSpecifier';

const oneLinerImportTemplate = stringTemplate`import ${0} from ${1}`;

const multiLineImportTemplate = stringTemplate`import ${3}{
${0}${1}
} from ${2}`;

const defaultAliasOnlyMultiLineImportTemplate = stringTemplate`import ${0}
from ${1}`;

/**
 * Sort function for symbol specifiers. Does sort after the specifiers name (to lowercase).
 *
 * @param {SymbolSpecifier} i1
 * @param {SymbolSpecifier} i2
 * @returns {number}
 */
function specifierSort(i1: SymbolSpecifier, i2: SymbolSpecifier): number {
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
export function generateNamedImport(
    imp: NamedImport,
    {
        eol,
        stringQuoteStyle,
        spaceBraces,
        tabSize,
        wrapMethod,
        multiLineWrapThreshold,
        multiLineTrailingComma,
        insertSpaces = true,
    }: TypescriptGenerationOptions,
): string {
    const lib = `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;
    // const specifiers = imp.specifiers.sort(specifierSort).map(o => generateSymbolSpecifier(o)).join(', ');
    const oneLinerImportStatement = oneLinerImportTemplate(getImportSpecifiers(imp, spaceBraces), lib);
    if (oneLinerImportStatement.length <= multiLineWrapThreshold &&
        (wrapMethod !== MultiLineImportRule.strictlyOneImportPerLine ||
            imp.specifiers.length <= 1)) {
        return oneLinerImportStatement;
    }
    const defaultAliasOnly: boolean = imp.specifiers.length === 0;
    if (defaultAliasOnly) {
        return defaultAliasOnlyMultiLineImportTemplate(
            imp.defaultAlias ? `${imp.defaultAlias}, ` : '',
            `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`,
        );
    }

    const sortedImportSpecifiers: SymbolSpecifier[] = imp.specifiers.sort(specifierSort);
    let importSpecifierStrings: string = '';
    const indent = insertSpaces ? Array(tabSize + 1).join(' ') : '\t';
    if (wrapMethod === MultiLineImportRule.strictlyOneImportPerLine ||
        wrapMethod === MultiLineImportRule.oneImportPerLineOnlyAfterThreshold) {
        importSpecifierStrings = sortedImportSpecifiers.map(o => `${indent}${generateSymbolSpecifier(o)}`).join(',\n');
    } else if (wrapMethod === MultiLineImportRule.multipleImportsPerLine) {
        importSpecifierStrings = sortedImportSpecifiers.reduce(
            (acc, curr) => {
                const symbolSpecifier: string = generateSymbolSpecifier(curr);
                // const dist: number = acc.out.length - acc.lastWrapOffset + symbolSpecifier.length;
                const importLines = acc.out.split('\n');
                const lastImportLine = importLines[importLines.length - 1];
                const dist: number = lastImportLine.length + `, `.length + symbolSpecifier.length;
                const needsWrap: boolean = dist >= multiLineWrapThreshold;
                return {
                    out: acc.out + (needsWrap ? `,\n${indent}` : (acc.out.length ? `, ` : `${indent}`)) +
                        symbolSpecifier,
                    lastWrapOffset: acc.lastWrapOffset + (needsWrap ? dist : 0),
                };
            },
            {
                out: '',
                lastWrapOffset: 0,
            },
        ).out;
    }
    return multiLineImportTemplate(
        importSpecifierStrings,
        multiLineTrailingComma ? ',' : '',
        `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`,
        imp.defaultAlias ? `${imp.defaultAlias}, ` : '',
    );
}

function getImportSpecifiers(namedImport: NamedImport, spaceBraces: boolean): string {
    if (namedImport.defaultAlias && namedImport.specifiers.length <= 0) {
        return namedImport.defaultAlias;
    }
    const space = spaceBraces ? ' ' : '';
    const specifiers = namedImport.specifiers.sort(specifierSort).map(o => generateSymbolSpecifier(o)).join(', ');
    let importSpecifiers = `${space}${specifiers}${space}`;
    if (importSpecifiers.trim().length === 0) {
        importSpecifiers = ' ';
    }
    if (namedImport.defaultAlias && namedImport.specifiers.length > 0) {
        return `${namedImport.defaultAlias}, {${importSpecifiers}}`;
    }
    return `{${importSpecifiers}}`;
}
