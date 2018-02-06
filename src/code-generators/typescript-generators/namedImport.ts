import { NamedImport } from '../../imports/NamedImport';
import { SymbolSpecifier } from '../../SymbolSpecifier';
import { stringTemplate } from '../../utilities/StringTemplate';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
import { generateSymbolSpecifier } from './symbolSpecifier';

const importTemplate = stringTemplate`import ${0} from ${1}`;

const multiLineImport = stringTemplate`import ${3}{
${0}${1}
} from ${2}`;

const aliasOnlyMultiLineImport = stringTemplate`import ${0}
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
        multiLineWrapMethod,
        multiLineWrapThreshold,
        multiLineTrailingComma,
    }: TypescriptGenerationOptions,
): string {
    const space = spaceBraces ? ' ' : '';
    const lib = `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;

    const specifiers = imp.specifiers.sort(specifierSort).map(o => generateSymbolSpecifier(o)).join(', ');
    let retVal:string = '';

    if (specifiers.length > multiLineWrapThreshold) {
        const spacings = Array(tabSize + 1).join(' ');
        const sortedImportSpecifiers: SymbolSpecifier[] = imp.specifiers.sort(specifierSort);
        let importSpecifierStrings: string = '';

        if (multiLineWrapMethod === 'MULTIPLE_IMPORTS_PER_LINE') {
            importSpecifierStrings = sortedImportSpecifiers.reduce(
                (acc, curr) => {
                    const symbolSpecifier: string = generateSymbolSpecifier(curr);
                    const dist: number = acc.out.length - acc.lastWrapOffset + symbolSpecifier.length;
                    const needsWrap: boolean = dist >= multiLineWrapThreshold;
                    return {
                        out: acc.out + (needsWrap ? `,\n${spacings}` : (acc.out.length ? `, ` : `${spacings}`)) +
                        symbolSpecifier,
                        lastWrapOffset: acc.lastWrapOffset + (needsWrap ? dist : 0),
                    };
                },
                {
                    out: '',
                    lastWrapOffset: 0,
                },
            ).out;
        } else {
            // For 'ONE_IMPORT_PER_LINE' which also happens to be the default case.
            importSpecifierStrings = sortedImportSpecifiers.map(o => `${spacings}${generateSymbolSpecifier(o)}`).join(',\n');
        }
        if (imp.specifiers.length > 0) {
            retVal = multiLineImport(
                importSpecifierStrings,
                multiLineTrailingComma ? ',' : '',
                `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`,
                imp.defaultAlias ? `${imp.defaultAlias}, ` : '',
            );
        } else {
            retVal = aliasOnlyMultiLineImport(
                imp.defaultAlias ? `${imp.defaultAlias}, ` : '',
                `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`,
            );
        }
    } else {
        retVal = importTemplate(
            getImportSpecifiers(imp, spaceBraces),
            lib,
        );
    }
    return retVal;
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
