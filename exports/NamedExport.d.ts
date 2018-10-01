import { SymbolSpecifier } from '../SymbolSpecifier';
import { Export } from './Export';
/**
 * Declares a named export (i.e. export { Foobar } from ...).
 *
 * @export
 * @class NamedExport
 * @implements {Export}
 */
export declare class NamedExport implements Export {
    start: number;
    end: number;
    from: string;
    specifiers: SymbolSpecifier[];
    constructor(start: number, end: number, from: string);
}
