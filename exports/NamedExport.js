"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Declares a named export (i.e. export { Foobar } from ...).
 *
 * @export
 * @class NamedExport
 * @implements {Export}
 */
class NamedExport {
    constructor(start, end, from) {
        this.start = start;
        this.end = end;
        this.from = from;
    }
}
exports.NamedExport = NamedExport;
