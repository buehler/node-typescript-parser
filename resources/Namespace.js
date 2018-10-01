"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
/**
 * TypeScript resource. Declaration of a typescript namespace (i.e. declare foobar).
 *
 * @export
 * @class Namespace
 * @implements {Resource}
 * @implements {Node}
 */
class Namespace {
    constructor(name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.imports = [];
        this.exports = [];
        this.declarations = [];
        this.resources = [];
        this.usages = [];
    }
    get identifier() {
        return this.name;
    }
    get nonLocalUsages() {
        return this.usages
            .filter(usage => !this.declarations.some(o => o.name === usage) &&
            !this.resources.some(o => (o instanceof Module_1.Module || o instanceof Namespace) && o.name === usage))
            .concat(this.resources.reduce((all, cur) => all.concat(cur.nonLocalUsages), []));
    }
    /**
     * Function that calculates the alias name of a namespace.
     * Removes all underlines and dashes and camelcases the name.
     *
     * @returns {string}
     *
     * @memberof Namespace
     */
    getNamespaceAlias() {
        return this.name.split(/[-_]/).reduce((all, cur, idx) => {
            if (idx === 0) {
                return all + cur.toLowerCase();
            }
            return all + cur.charAt(0).toUpperCase() + cur.substring(1).toLowerCase();
        }, '');
    }
}
exports.Namespace = Namespace;
