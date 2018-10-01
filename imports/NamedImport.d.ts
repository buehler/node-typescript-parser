import { SymbolSpecifier } from '../SymbolSpecifier';
import { Import } from './Import';
/**
 * Basic typescript import (ES6 style). Does contain multiple symbols of a file and converts
 * itself to a multiline import if the threshold is reached.
 * Can also contain a default import part.
 * (i.e. import {Foobar} from ...).
 *
 * @export
 * @class NamedImport
 * @implements {Import}
 */
export declare class NamedImport implements Import {
    libraryName: string;
    start?: number | undefined;
    end?: number | undefined;
    specifiers: SymbolSpecifier[];
    defaultAlias?: string;
    readonly isNew: boolean;
    constructor(libraryName: string, start?: number | undefined, end?: number | undefined);
    /**
     * Clone the current import object.
     *
     * @returns {NamedImport}
     *
     * @memberof NamedImport
     */
    clone(): NamedImport;
}
