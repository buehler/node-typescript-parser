import { Declaration } from '../declarations/Declaration';
import { Export } from '../exports/Export';
import { Import } from '../imports/Import';
import { Node } from '../Node';
import { Namespace } from './Namespace';
import { Resource } from './Resource';

/**
 * TypeScript resource. Declaration of a typescript module (i.e. declare module "foobar").
 * 
 * @export
 * @class Module
 * @implements {Resource}
 * @implements {Node}
 */
export class Module implements Resource, Node {
    public imports: Import[] = [];
    public exports: Export[] = [];
    public declarations: Declaration[] = [];
    public resources: Resource[] = [];
    public usages: string[] = [];

    public get identifier(): string {
        return this.name;
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

    constructor(public name: string, public start: number, public end: number) { }

    /**
     * Function that calculates the alias name of a namespace.
     * Removes all underlines and dashes and camelcases the name.
     * 
     * @returns {string}
     * 
     * @memberof Module
     */
    public getNamespaceAlias(): string {
        return this.name.split(/[-_]/).reduce(
            (all, cur, idx) => {
                if (idx === 0) {
                    return all + cur.toLowerCase();
                } else {
                    return all + cur.charAt(0).toUpperCase() + cur.substring(1).toLowerCase();
                }
            },
            '',
        );
    }
}
