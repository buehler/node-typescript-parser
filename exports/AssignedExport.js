"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("../resources/Module");
const Namespace_1 = require("../resources/Namespace");
const TypescriptHeroGuards_1 = require("../type-guards/TypescriptHeroGuards");
/**
 * Declares an all export (i.e. export * from ...).
 *
 * @export
 * @class AssignedExport
 * @implements {Export}
 */
class AssignedExport {
    constructor(start, end, declarationIdentifier, resource) {
        this.start = start;
        this.end = end;
        this.declarationIdentifier = declarationIdentifier;
        this.resource = resource;
    }
    /**
     * Returns a list of exported objects of this export.
     * This returns a list of possible exportable declarations or further exported resources.
     *
     * @readonly
     * @type {((ExportableDeclaration | Resource)[])}
     * @memberof AssignedExport
     */
    get exported() {
        return [
            ...this.resource.declarations
                .filter(o => TypescriptHeroGuards_1.isExportableDeclaration(o) && o.isExported && o.name === this.declarationIdentifier),
            ...this.resource.resources
                .filter(o => (o instanceof Namespace_1.Namespace || o instanceof Module_1.Module) && o.name === this.declarationIdentifier),
        ];
    }
}
exports.AssignedExport = AssignedExport;
