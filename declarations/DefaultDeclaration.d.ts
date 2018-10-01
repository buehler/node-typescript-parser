import { Resource } from '../resources/Resource';
import { Declaration, ExportableDeclaration } from './Declaration';
/**
 * Default declaration. Is used when a file exports something as its default.
 * Primary use is to ask the user about a name for the default export.
 * Is kind of an abstract declaration since there is no real declaration.
 *
 * @export
 * @class DefaultDeclaration
 * @implements {ExportableDeclaration}
 */
export declare class DefaultDeclaration implements ExportableDeclaration {
    name: string;
    private resource;
    start?: number | undefined;
    end?: number | undefined;
    readonly isExported: boolean;
    private exported;
    readonly exportedDeclaration: Declaration;
    constructor(name: string, resource: Resource, start?: number | undefined, end?: number | undefined);
}
