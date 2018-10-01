"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const AccessorDeclaration_1 = require("../declarations/AccessorDeclaration");
const ClassDeclaration_1 = require("../declarations/ClassDeclaration");
const ConstructorDeclaration_1 = require("../declarations/ConstructorDeclaration");
const DefaultDeclaration_1 = require("../declarations/DefaultDeclaration");
const MethodDeclaration_1 = require("../declarations/MethodDeclaration");
const ParameterDeclaration_1 = require("../declarations/ParameterDeclaration");
const PropertyDeclaration_1 = require("../declarations/PropertyDeclaration");
const TypescriptGuards_1 = require("../type-guards/TypescriptGuards");
const function_parser_1 = require("./function-parser");
const identifier_parser_1 = require("./identifier-parser");
const parse_utilities_1 = require("./parse-utilities");
/**
 * Parses the identifiers of a class (usages).
 *
 * @export
 * @param {Resource} tsResource
 * @param {Node} node
 */
function parseClassIdentifiers(tsResource, node) {
    for (const child of node.getChildren()) {
        switch (child.kind) {
            case typescript_1.SyntaxKind.Identifier:
                identifier_parser_1.parseIdentifier(tsResource, child);
                break;
            default:
                break;
        }
        parseClassIdentifiers(tsResource, child);
    }
}
exports.parseClassIdentifiers = parseClassIdentifiers;
/**
 * Parse information about a constructor. Contains parameters and used modifiers
 * (i.e. constructor(private name: string)).
 *
 * @export
 * @param {TshClass} parent
 * @param {TshConstructor} ctor
 * @param {ConstructorDeclaration} node
 */
function parseCtorParams(parent, ctor, node) {
    if (!node.parameters) {
        return;
    }
    node.parameters.forEach((o) => {
        if (TypescriptGuards_1.isIdentifier(o.name)) {
            ctor.parameters.push(new ParameterDeclaration_1.ParameterDeclaration(o.name.text, parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd()));
            if (!o.modifiers) {
                return;
            }
            parent.properties.push(new PropertyDeclaration_1.PropertyDeclaration(o.name.text, parse_utilities_1.getNodeVisibility(o), parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd()));
        }
        else if (TypescriptGuards_1.isObjectBindingPattern(o.name) || TypescriptGuards_1.isArrayBindingPattern(o.name)) {
            const identifiers = o.name;
            const elements = [...identifiers.elements];
            ctor.parameters = ctor.parameters.concat(elements.map((bind) => {
                if (TypescriptGuards_1.isIdentifier(bind.name)) {
                    return new ParameterDeclaration_1.ParameterDeclaration(bind.name.text, undefined, bind.getStart(), bind.getEnd());
                }
            }).filter(Boolean));
        }
    });
}
exports.parseCtorParams = parseCtorParams;
/**
 * Parses a class node into its declaration. Calculates the properties, constructors and methods of the class.
 *
 * @export
 * @param {Resource} tsResource
 * @param {ClassDeclaration} node
 */
function parseClass(tsResource, node) {
    const name = node.name ? node.name.text : parse_utilities_1.getDefaultResourceIdentifier(tsResource);
    const classDeclaration = new ClassDeclaration_1.ClassDeclaration(name, parse_utilities_1.isNodeExported(node), node.getStart(), node.getEnd());
    if (parse_utilities_1.isNodeDefaultExported(node)) {
        classDeclaration.isExported = false;
        tsResource.declarations.push(new DefaultDeclaration_1.DefaultDeclaration(classDeclaration.name, tsResource));
    }
    if (node.typeParameters) {
        classDeclaration.typeParameters = node.typeParameters.map(param => param.getText());
    }
    if (node.members) {
        node.members.forEach((o) => {
            if (TypescriptGuards_1.isPropertyDeclaration(o)) {
                const actualCount = classDeclaration.properties.length;
                if (o.modifiers) {
                    classDeclaration.properties.push(new PropertyDeclaration_1.PropertyDeclaration(o.name.text, parse_utilities_1.getNodeVisibility(o), parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd()));
                }
                if (actualCount === classDeclaration.properties.length) {
                    classDeclaration.properties.push(new PropertyDeclaration_1.PropertyDeclaration(o.name.text, parse_utilities_1.getNodeVisibility(o), parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd()));
                }
                return;
            }
            if (TypescriptGuards_1.isGetAccessorDeclaration(o)) {
                classDeclaration.accessors.push(new AccessorDeclaration_1.GetterDeclaration(o.name.text, parse_utilities_1.getNodeVisibility(o), parse_utilities_1.getNodeType(o.type), o.modifiers !== undefined && o.modifiers.some(m => m.kind === typescript_1.SyntaxKind.AbstractKeyword), o.getStart(), o.getEnd()));
            }
            if (TypescriptGuards_1.isSetAccessorDeclaration(o)) {
                classDeclaration.accessors.push(new AccessorDeclaration_1.SetterDeclaration(o.name.text, parse_utilities_1.getNodeVisibility(o), parse_utilities_1.getNodeType(o.type), o.modifiers !== undefined && o.modifiers.some(m => m.kind === typescript_1.SyntaxKind.AbstractKeyword), o.getStart(), o.getEnd()));
            }
            if (TypescriptGuards_1.isConstructorDeclaration(o)) {
                const ctor = new ConstructorDeclaration_1.ConstructorDeclaration(classDeclaration.name, o.getStart(), o.getEnd());
                parseCtorParams(classDeclaration, ctor, o);
                classDeclaration.ctor = ctor;
                function_parser_1.parseFunctionParts(tsResource, ctor, o);
            }
            else if (TypescriptGuards_1.isMethodDeclaration(o)) {
                const method = new MethodDeclaration_1.MethodDeclaration(o.name.text, o.modifiers !== undefined && o.modifiers.some(m => m.kind === typescript_1.SyntaxKind.AbstractKeyword), parse_utilities_1.getNodeVisibility(o), parse_utilities_1.getNodeType(o.type), o.getStart(), o.getEnd());
                method.parameters = function_parser_1.parseMethodParams(o);
                classDeclaration.methods.push(method);
                function_parser_1.parseFunctionParts(tsResource, method, o);
            }
        });
    }
    parseClassIdentifiers(tsResource, node);
    tsResource.declarations.push(classDeclaration);
}
exports.parseClass = parseClass;
