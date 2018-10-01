"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const PathHelpers_1 = require("../utilities/PathHelpers");
const Module_1 = require("./Module");
const Namespace_1 = require("./Namespace");
/**
 * TypeScript resource. Basically a file that is located somewhere.
 *
 * @export
 * @class File
 * @implements {Resource}
 * @implements {Node}
 */
class File {
    constructor(filePath, rootPath, start, end) {
        this.filePath = filePath;
        this.rootPath = rootPath;
        this.start = start;
        this.end = end;
        this.imports = [];
        this.exports = [];
        this.declarations = [];
        this.resources = [];
        this.usages = [];
    }
    get identifier() {
        return '/' + PathHelpers_1.normalizeFilename(path_1.relative(this.rootPath, this.filePath));
    }
    get nonLocalUsages() {
        return this.usages
            .filter(usage => !this.declarations.some(o => o.name === usage) &&
            !this.resources.some(o => (o instanceof Module_1.Module || o instanceof Namespace_1.Namespace) && o.name === usage))
            .concat(this.resources.reduce((all, cur) => all.concat(cur.nonLocalUsages), []));
    }
    /**
     * Returns the parsed path of a resource.
     *
     * @readonly
     * @type {ParsedPath}
     * @memberof File
     */
    get parsedPath() {
        return path_1.parse(this.filePath);
    }
    /**
     * Determines if a file is a workspace file or an external resource.
     *
     * @readonly
     * @type {boolean}
     * @memberof File
     */
    get isWorkspaceFile() {
        return ['node_modules', 'typings'].every(o => this.filePath.indexOf(o) === -1);
    }
}
exports.File = File;
