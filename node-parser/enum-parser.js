"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnumDeclaration_1 = require("../declarations/EnumDeclaration");
const parse_utilities_1 = require("./parse-utilities");
/**
 * Parses an enum node into the declaration.
 *
 * @export
 * @param {resource} resource
 * @param {EnumDeclaration} node
 */
function parseEnum(resource, node) {
    const declaration = new EnumDeclaration_1.EnumDeclaration(node.name.text, parse_utilities_1.isNodeExported(node), node.getStart(), node.getEnd());
    declaration.members = node.members.map(o => o.name.getText());
    resource.declarations.push(declaration);
}
exports.parseEnum = parseEnum;
