/// <reference types="node" />
import { ParsedPath } from 'path';
import { Declaration } from '../declarations/Declaration';
import { Export } from '../exports/Export';
import { Import } from '../imports/Import';
import { Node } from '../Node';
import { Resource } from './Resource';
/**
 * TypeScript resource. Basically a file that is located somewhere.
 *
 * @export
 * @class File
 * @implements {Resource}
 * @implements {Node}
 */
export declare class File implements Resource, Node {
    filePath: string;
    private rootPath;
    start: number;
    end: number;
    imports: Import[];
    exports: Export[];
    declarations: Declaration[];
    resources: Resource[];
    usages: string[];
    readonly identifier: string;
    readonly nonLocalUsages: string[];
    /**
     * Returns the parsed path of a resource.
     *
     * @readonly
     * @type {ParsedPath}
     * @memberof File
     */
    readonly parsedPath: ParsedPath;
    /**
     * Determines if a file is a workspace file or an external resource.
     *
     * @readonly
     * @type {boolean}
     * @memberof File
     */
    readonly isWorkspaceFile: boolean;
    constructor(filePath: string, rootPath: string, start: number, end: number);
}
