import { Clonable } from './clonable/Clonable';
/**
 * Class for symbols that are contained in a named import or export or anywhere. Basically an aliased object.
 * (i.e. import {SYMBOL} from '...').
 *
 * @export
 * @class SymbolSpecifier
 * @implements {Clonable}
 */
export declare class SymbolSpecifier implements Clonable<SymbolSpecifier> {
    specifier: string;
    alias?: string | undefined;
    constructor(specifier: string, alias?: string | undefined);
    /**
     * Clones the current resolve specifier and returns a new instance with the same properties.
     *
     * @returns {SymbolSpecifier}
     *
     * @memberof SymbolSpecifier
     */
    clone(): SymbolSpecifier;
}
