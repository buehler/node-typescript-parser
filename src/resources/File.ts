import { parse, ParsedPath, relative } from 'path';

import { Declaration } from '../declarations/Declaration';
import { Export } from '../exports/Export';
import { Import } from '../imports/Import';
import { Node } from '../Node';
import { normalizeFilename } from '../utilities/PathHelpers';
import { Module } from './Module';
import { Namespace } from './Namespace';
import { Resource } from './Resource';

/**
 * TypeScript resource. Basically a file that is located somewhere.
 * 
 * @export
 * @class File
 * @implements {Resource}
 * @implements {Node}
 */
export class File implements Resource, Node {
    public imports: Import[] = [];
    public exports: Export[] = [];
    public declarations: Declaration[] = [];
    public resources: Resource[] = [];
    public usages: string[] = [];

    public get identifier(): string {
        return '/' + normalizeFilename(relative(this.rootPath, this.filePath));
    }

    public get nonLocalUsages(): string[] {
        return this.usages
            .filter(usage =>
                !this.declarations.some(o => o.name === usage) &&
                !this.resources.some(o => (o instanceof Module || o instanceof Namespace) && o.name === usage))
            .concat(
            this.resources.reduce((all, cur) => all.concat(cur.nonLocalUsages), [] as string[]),
        );
    }

    /**
     * Returns the parsed path of a resource.
     * 
     * @readonly
     * @type {ParsedPath}
     * @memberof File
     */
    public get parsedPath(): ParsedPath {
        return parse(this.filePath);
    }

    /**
     * Determines if a file is a workspace file or an external resource.
     * 
     * @readonly
     * @type {boolean}
     * @memberof File
     */
    public get isWorkspaceFile(): boolean {
        return ['node_modules', 'typings'].every(o => this.filePath.indexOf(o) === -1);
    }

    constructor(public filePath: string, private rootPath: string, public start: number, public end: number) { }
}
