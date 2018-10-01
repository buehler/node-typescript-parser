import { Export } from './Export';
/**
 * Declares an all export (i.e. export * from ...).
 *
 * @export
 * @class AllExport
 * @implements {Export}
 */
export declare class AllExport implements Export {
    start: number;
    end: number;
    from: string;
    constructor(start: number, end: number, from: string);
}
