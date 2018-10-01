import { ClassDeclaration, ConstructorDeclaration, Node } from 'typescript';
import { ClassDeclaration as TshClass } from '../declarations/ClassDeclaration';
import { ConstructorDeclaration as TshConstructor } from '../declarations/ConstructorDeclaration';
import { Resource } from '../resources/Resource';
/**
 * Parses the identifiers of a class (usages).
 *
 * @export
 * @param {Resource} tsResource
 * @param {Node} node
 */
export declare function parseClassIdentifiers(tsResource: Resource, node: Node): void;
/**
 * Parse information about a constructor. Contains parameters and used modifiers
 * (i.e. constructor(private name: string)).
 *
 * @export
 * @param {TshClass} parent
 * @param {TshConstructor} ctor
 * @param {ConstructorDeclaration} node
 */
export declare function parseCtorParams(parent: TshClass, ctor: TshConstructor, node: ConstructorDeclaration): void;
/**
 * Parses a class node into its declaration. Calculates the properties, constructors and methods of the class.
 *
 * @export
 * @param {Resource} tsResource
 * @param {ClassDeclaration} node
 */
export declare function parseClass(tsResource: Resource, node: ClassDeclaration): void;
