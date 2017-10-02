import { NamedImport } from '../../imports/NamedImport';
import { SymbolSpecifier } from '../../SymbolSpecifier';
import { stringTemplate } from '../../utilities/StringTemplate';
import { TypescriptGenerationOptions } from '../TypescriptGenerationOptions';
import { generateSymbolSpecifier } from './symbolSpecifier';

const importTemplate = stringTemplate`import ${0} from ${1}`;

const multiLineImport = stringTemplate`import ${3}{
${0}${1}
} from ${2}`;

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
    } else if (strA > strB) {
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
        multiLineWrapThreshold,
        multiLineTrailingComma,
    }: TypescriptGenerationOptions,
): string {
    const space = spaceBraces ? ' ' : '';
    const lib = `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`;

    const specifiers = imp.specifiers.sort(specifierSort).map(o => generateSymbolSpecifier(o)).join(', ');
    let importSpecifiers = `${space}${specifiers}${space}`;
    if (importSpecifiers.trim().length === 0) {
        importSpecifiers = ' ';
    }

    const importString = importTemplate(
        getImportSpecifiers(imp, spaceBraces),
        lib,
    );

    if (importString.length > multiLineWrapThreshold) {
        const spacings = Array(tabSize + 1).join(' ');
        return multiLineImport(
            imp.specifiers.sort(specifierSort).map(o => `${spacings}${generateSymbolSpecifier(o)}`).join(',\n'),
            multiLineTrailingComma ? ',' : '',
            `${stringQuoteStyle}${imp.libraryName}${stringQuoteStyle}${eol}`,
            imp.defaultAlias ? `${imp.defaultAlias}, ` : '',
        );
    }
    return importString;
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
