import {
    FunctionDeclaration,
    Identifier,
    isTupleTypeNode,
    isTypeLiteralNode,
    isTypeReferenceNode,
    MethodDeclaration,
    MethodSignature,
    Node,
    ParameterDeclaration,
    PropertySignature,
    SyntaxKind,
    VariableStatement,
} from 'typescript';

import { ConstructorDeclaration as TshConstructor } from '../declarations/ConstructorDeclaration';
import { DefaultDeclaration as TshDefault } from '../declarations/DefaultDeclaration';
import { FunctionDeclaration as TshFunction } from '../declarations/FunctionDeclaration';
import { MethodDeclaration as TshMethod } from '../declarations/MethodDeclaration';
import {
    ArrayBoundParameterDeclaration,
    ObjectBoundParameterDeclaration,
    ParameterDeclaration as TshParameter,
} from '../declarations/ParameterDeclaration';
import { Resource } from '../resources/Resource';
import {
    isArrayBindingPattern,
    isIdentifier,
    isObjectBindingPattern,
    isPropertySignature,
} from '../type-guards/TypescriptGuards';
import { parseIdentifier } from './identifier-parser';
import {
    containsModifier,
    getDefaultResourceIdentifier,
    getNodeType,
    isNodeDefaultExported,
    isNodeExported,
} from './parse-utilities';
import { parseVariable } from './variable-parser';

/**
 * Parse the parts of a function. All functions / methods contain various information about used variables
 * and parameters.
 *
 * @export
 * @param {Resource} resource
 * @param {(TshConstructor | TshMethod | TshFunction)} parent
 * @param {Node} node
 */
export function parseFunctionParts(
    resource: Resource,
    parent: TshConstructor | TshMethod | TshFunction,
    node: Node,
): void {
    for (const child of node.getChildren()) {
        switch (child.kind) {
            case SyntaxKind.Identifier:
                parseIdentifier(resource, <Identifier>child);
                break;
            case SyntaxKind.VariableStatement:
                parseVariable(parent, <VariableStatement>child);
                break;
            default:
                break;
        }
        parseFunctionParts(resource, parent, child);
    }
}

/**
 * Parse method parameters.
 *
 * @export
 * @param {(FunctionDeclaration | MethodDeclaration | MethodSignature)} node
 * @returns {TshParameter[]}
 */
export function parseMethodParams(
    node: FunctionDeclaration | MethodDeclaration | MethodSignature,
): TshParameter[] {
    return node.parameters.reduce(
        (all: TshParameter[], cur: ParameterDeclaration) => {
            const params = all;
            if (isIdentifier(cur.name)) {
                params.push(new TshParameter(
                    (cur.name as Identifier).text, getNodeType(cur.type), cur.getStart(), cur.getEnd(),
                ));
            } else if (isObjectBindingPattern(cur.name)) {
                const elements = cur.name.elements;
                let types: (string | undefined)[] = [];
                const boundParam = new ObjectBoundParameterDeclaration(cur.getStart(), cur.getEnd());

                if (cur.type && isTypeReferenceNode(cur.type)) {
                    boundParam.typeReference = getNodeType(cur.type);
                } else if (cur.type && isTypeLiteralNode(cur.type)) {
                    types = cur.type.members
                        .filter(member => isPropertySignature(member))
                        .map((signature: any) => getNodeType((signature as PropertySignature).type));
                }

                boundParam.parameters = elements.map((bindingElement, index) => new TshParameter(
                    bindingElement.name.getText(),
                    types[index],
                    bindingElement.getStart(),
                    bindingElement.getEnd(),
                ));

                params.push(boundParam);
            } else if (isArrayBindingPattern(cur.name)) {
                const elements = cur.name.elements;
                let types: (string | undefined)[] = [];
                const boundParam = new ArrayBoundParameterDeclaration(cur.getStart(), cur.getEnd());

                if (cur.type && isTypeReferenceNode(cur.type)) {
                    boundParam.typeReference = getNodeType(cur.type);
                } else if (cur.type && isTupleTypeNode(cur.type)) {
                    types = cur.type.elementTypes.map(type => getNodeType(type));
                }

                boundParam.parameters = elements.map((bindingElement, index) => new TshParameter(
                    bindingElement.getText(),
                    types[index],
                    bindingElement.getStart(),
                    bindingElement.getEnd(),
                ));

                params.push(boundParam);
            }
            return params;
        },
        [],
    );
}

/**
 * Parses a function into its declaration.
 * Parses the functions sub information like parameters and variables.
 *
 * @export
 * @param {Resource} resource
 * @param {FunctionDeclaration} node
 */
export function parseFunction(resource: Resource, node: FunctionDeclaration): void {
    const name = node.name ? node.name.text : getDefaultResourceIdentifier(resource);
    const func = new TshFunction(
        name,
        isNodeExported(node),
        containsModifier(node, SyntaxKind.AsyncKeyword),
        getNodeType(node.type),
        node.getStart(),
        node.getEnd(),
    );
    if (isNodeDefaultExported(node)) {
        func.isExported = false;
        resource.declarations.push(new TshDefault(func.name, resource));
    }
    func.parameters = parseMethodParams(node);
    resource.declarations.push(func);
    parseFunctionParts(resource, func, node);
}
