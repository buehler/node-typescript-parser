import { GetterDeclaration, SetterDeclaration } from '../declarations/AccessorDeclaration';
import { Declaration } from '../declarations/Declaration';
import { MethodDeclaration } from '../declarations/MethodDeclaration';
import { ParameterDeclaration } from '../declarations/ParameterDeclaration';
import { PropertyDeclaration } from '../declarations/PropertyDeclaration';
import { VariableDeclaration } from '../declarations/VariableDeclaration';
import { NotGeneratableYetError } from '../errors/NotGeneratableYetError';
import { Export } from '../exports/Export';
import { ExternalModuleImport } from '../imports/ExternalModuleImport';
import { Import } from '../imports/Import';
import { NamedImport } from '../imports/NamedImport';
import { NamespaceImport } from '../imports/NamespaceImport';
import { StringImport } from '../imports/StringImport';
import { SymbolSpecifier } from '../SymbolSpecifier';
import { generateAccessorDeclaration } from './typescript-generators/accessorDeclaration';
import { generateExternalModuleImport } from './typescript-generators/externalModuleImport';
import { generateMethodDeclaration } from './typescript-generators/methodDeclaration';
import { generateNamedImport } from './typescript-generators/namedImport';
import { generateNamespaceImport } from './typescript-generators/namespaceImport';
import { generateParameterDeclaration } from './typescript-generators/parameterDeclaration';
import { generatePropertyDeclaration } from './typescript-generators/propertyDeclaration';
import { generateStringImport } from './typescript-generators/stringImport';
import { generateSymbolSpecifier } from './typescript-generators/symbolSpecifier';
import { generateVariableDelcaration } from './typescript-generators/variableDeclaration';
import { TypescriptGenerationOptions } from './TypescriptGenerationOptions';

/**
 * All generatable items combined. If the element is not generatable, the specific generator should throw
 * an exception.
 */
export type Generatable = Declaration | Import | Export | SymbolSpecifier;

/**
 * Type for generators.
 */
export type Generators = { [name: string]: (generatable: Generatable, options: TypescriptGenerationOptions) => string };

/**
 * Hash with all possible (yet implemented) generators.
 */
export const GENERATORS: Generators = {
    [SymbolSpecifier.name]: generateSymbolSpecifier,
    [MethodDeclaration.name]: generateMethodDeclaration,
    [ParameterDeclaration.name]: generateParameterDeclaration,
    [PropertyDeclaration.name]: generatePropertyDeclaration,
    [VariableDeclaration.name]: generateVariableDelcaration,
    [ExternalModuleImport.name]: generateExternalModuleImport,
    [NamedImport.name]: generateNamedImport,
    [NamespaceImport.name]: generateNamespaceImport,
    [StringImport.name]: generateStringImport,
    [SetterDeclaration.name]: generateAccessorDeclaration,
    [GetterDeclaration.name]: generateAccessorDeclaration,
};

/**
 * Generator for typescript code elements. Takes a generatable object and tries to generate typescript code.
 *
 * @export
 * @class TypescriptCodeGenerator
 */
export class TypescriptCodeGenerator {
    constructor(private options: TypescriptGenerationOptions) { }

    /**
     * Generator function. Calls the specific element generator. If no generator is found, an exception is thrown.
     *
     * @param {Generatable} declaration
     * @returns {string}
     * @throws {NotGeneratableYetError}
     * @memberof TypescriptCodeGenerator
     */
    public generate(declaration: Generatable): string {
        if (GENERATORS[declaration.constructor.name]) {
            return GENERATORS[declaration.constructor.name](declaration, this.options);
        }
        throw new NotGeneratableYetError(declaration);
    }
}
