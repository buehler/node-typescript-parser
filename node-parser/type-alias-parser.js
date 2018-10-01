"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeAliasDeclaration_1 = require("../declarations/TypeAliasDeclaration");
const parse_utilities_1 = require("./parse-utilities");
/**
 * Parses a type alias into the declaration.
 *
 * @export
 * @param {Resource} resource
 * @param {TypeAliasDeclaration} node
 */
function parseTypeAlias(resource, node) {
    resource.declarations.push(new TypeAliasDeclaration_1.TypeAliasDeclaration(node.name.text, parse_utilities_1.isNodeExported(node), node.getStart(), node.getEnd()));
}
exports.parseTypeAlias = parseTypeAlias;
