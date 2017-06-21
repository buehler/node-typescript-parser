import { SymbolSpecifier } from '../../SymbolSpecifier';

/**
 * Generates typescript code for a symbol specifier.
 * 
 * @export
 * @param {SymbolSpecifier} specifier 
 * @returns {string} 
 */
export function generateSymbolSpecifier(specifier: SymbolSpecifier): string {
    return `${specifier.specifier}${specifier.alias ? ` as ${specifier.alias}` : ''}`;
}
