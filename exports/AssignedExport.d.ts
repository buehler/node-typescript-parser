import { ExportableDeclaration } from '../declarations/Declaration';
import { Resource } from '../resources/Resource';
import { Export } from './Export';
/**
 * Declares an all export (i.e. export * from ...).
 *
 * @export
 * @class AssignedExport
 * @implements {Export}
 */
export declare class AssignedExport implements Export {
    start: number;
    end: number;
    declarationIdentifier: string;
    private resource;
    /**
     * Returns a list of exported objects of this export.
     * This returns a list of possible exportable declarations or further exported resources.
     *
     * @readonly
     * @type {((ExportableDeclaration | Resource)[])}
     * @memberof AssignedExport
     */
    readonly exported: (ExportableDeclaration | Resource)[];
    constructor(start: number, end: number, declarationIdentifier: string, resource: Resource);
}
