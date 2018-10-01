"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultDeclaration_1 = require("../declarations/DefaultDeclaration");
const InterfaceDeclaration_1 = require("../declarations/InterfaceDeclaration");
const MethodDeclaration_1 = require("../declarations/MethodDeclaration");
const PropertyDeclaration_1 = require("../declarations/PropertyDeclaration");
const TypescriptGuards_1 = require("../type-guards/TypescriptGuards");
const function_parser_1 = require("./function-parser");
const parse_utilities_1 = require("./parse-utilities");
/**
 * Parses an interface node into its declaration.
 * Calculates the property and method defintions of the interface as well.
 *
 * @export
 * @param {Resource} resource
 * @param {InterfaceDeclaration} node
 */
function parseInterface(resource, node) {
    const name = node.name ? node.name.text : parse_utilities_1.getDefaultResourceIdentifier(resource);
    const interfaceDeclaration = new InterfaceDeclaration_1.InterfaceDeclaration(name, parse_utilities_1.isNodeExported(node), node.getStart(), node.getEnd());
    if (parse_utilities_1.isNodeDefaultExported(node)) {
        interfaceDeclaration.isExported = false;
        resource.declarations.push(new DefaultDeclaration_1.DefaultDeclaration(interfaceDeclaration.name, resource));
    }
    if (node.members) {
        node.members.forEach((o) => {
            if (TypescriptGuards_1.isPropertySignature(o)) {
                interfaceDeclaration.properties.push(new PropertyDeclaration_1.PropertyDeclaration(o.name.text, 2 /* Public */, parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd()));
            }
            else if (TypescriptGuards_1.isMethodSignature(o)) {
                const method = new MethodDeclaration_1.MethodDeclaration(o.name.text, true, 2 /* Public */, parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd());
                method.parameters = function_parser_1.parseMethodParams(o);
                interfaceDeclaration.methods.push(method);
            }
        });
    }
    if (node.typeParameters) {
        interfaceDeclaration.typeParameters = node.typeParameters.map(param => param.getText());
    }
    resource.declarations.push(interfaceDeclaration);
}
exports.parseInterface = parseInterface;
