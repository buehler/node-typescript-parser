"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const Module_1 = require("../resources/Module");
const Namespace_1 = require("../resources/Namespace");
/**
 * Parse a module to its declaration. Create a new namespace or module declaration and return it to
 * be used as the new "container".
 *
 * @export
 * @param {Resource} resource
 * @param {ModuleDeclaration} node
 * @returns {Resource}
 */
function parseModule(resource, node) {
    const newResource = (node.flags & typescript_1.NodeFlags.Namespace) === typescript_1.NodeFlags.Namespace ?
        new Namespace_1.Namespace(node.name.text, node.getStart(), node.getEnd()) :
        new Module_1.Module(node.name.text, node.getStart(), node.getEnd());
    resource.resources.push(newResource);
    return newResource;
}
exports.parseModule = parseModule;
