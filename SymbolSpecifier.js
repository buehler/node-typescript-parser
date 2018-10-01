"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for symbols that are contained in a named import or export or anywhere. Basically an aliased object.
 * (i.e. import {SYMBOL} from '...').
 *
 * @export
 * @class SymbolSpecifier
 * @implements {Clonable}
 */
class SymbolSpecifier {
    constructor(specifier, alias) {
        this.specifier = specifier;
        this.alias = alias;
    }
    /**
     * Clones the current resolve specifier and returns a new instance with the same properties.
     *
     * @returns {SymbolSpecifier}
     *
     * @memberof SymbolSpecifier
     */
    clone() {
        return new SymbolSpecifier(this.specifier, this.alias);
    }
}
exports.SymbolSpecifier = SymbolSpecifier;
