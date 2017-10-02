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
export class NamedImport implements Import {
    public specifiers: SymbolSpecifier[] = [];
    public defaultAlias?: string;

    public get isNew(): boolean {
        return this.start === undefined || this.end === undefined;
    }

    constructor(public libraryName: string, public start?: number, public end?: number) { }

    /**
     * Clone the current import object.
     *
     * @returns {NamedImport}
     *
     * @memberof NamedImport
     */
    public clone(): NamedImport {
        const clone = new NamedImport(this.libraryName, this.start, this.end);
        clone.specifiers = this.specifiers.map(o => o.clone());
        clone.defaultAlias = this.defaultAlias;
        return clone;
    }
}
