import { SymbolSpecifier } from '../SymbolSpecifier';
import { Export } from './Export';

/**
 * Declares a named export (i.e. export { Foobar } from ...).
 * 
 * @export
 * @class NamedExport
 * @implements {Export}
 */
export class NamedExport implements Export {
    public specifiers: SymbolSpecifier[];

    constructor(public start: number, public end: number, public from: string) { }
}
