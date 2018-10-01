import { FunctionDeclaration, MethodDeclaration, MethodSignature, Node } from 'typescript';
import { ConstructorDeclaration as TshConstructor } from '../declarations/ConstructorDeclaration';
import { FunctionDeclaration as TshFunction } from '../declarations/FunctionDeclaration';
import { MethodDeclaration as TshMethod } from '../declarations/MethodDeclaration';
import { ParameterDeclaration as TshParameter } from '../declarations/ParameterDeclaration';
import { Resource } from '../resources/Resource';
/**
 * Parse the parts of a function. All functions / methods contain various information about used variables
 * and parameters.
 *
 * @export
 * @param {Resource} resource
 * @param {(TshConstructor | TshMethod | TshFunction)} parent
 * @param {Node} node
 */
export declare function parseFunctionParts(resource: Resource, parent: TshConstructor | TshMethod | TshFunction, node: Node): void;
/**
 * Parse method parameters.
 *
 * @export
 * @param {(FunctionDeclaration | MethodDeclaration | MethodSignature)} node
 * @returns {TshParameter[]}
 */
export declare function parseTypeArguments(node: FunctionDeclaration | MethodDeclaration | MethodSignature): TshParameter[];
/**
 * Parse method parameters.
 *
 * @export
 * @param {(FunctionDeclaration | MethodDeclaration | MethodSignature)} node
 * @returns {TshParameter[]}
 */
export declare function parseMethodParams(node: FunctionDeclaration | MethodDeclaration | MethodSignature): TshParameter[];
/**
 * Parses a function into its declaration.
 * Parses the functions sub information like parameters and variables.
 *
 * @export
 * @param {Resource} resource
 * @param {FunctionDeclaration} node
 */
export declare function parseFunction(resource: Resource, node: FunctionDeclaration): void;
