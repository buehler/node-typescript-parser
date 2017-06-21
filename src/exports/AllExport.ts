import { Export } from './Export';

/**
 * Declares an all export (i.e. export * from ...).
 * 
 * @export
 * @class AllExport
 * @implements {Export}
 */
export class AllExport implements Export {
    constructor(public start: number, public end: number, public from: string) { }
}
