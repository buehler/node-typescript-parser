"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessorDeclaration_1 = require("../declarations/AccessorDeclaration");
const MethodDeclaration_1 = require("../declarations/MethodDeclaration");
const ParameterDeclaration_1 = require("../declarations/ParameterDeclaration");
const PropertyDeclaration_1 = require("../declarations/PropertyDeclaration");
const VariableDeclaration_1 = require("../declarations/VariableDeclaration");
const NotGeneratableYetError_1 = require("../errors/NotGeneratableYetError");
const ExternalModuleImport_1 = require("../imports/ExternalModuleImport");
const NamedImport_1 = require("../imports/NamedImport");
const NamespaceImport_1 = require("../imports/NamespaceImport");
const StringImport_1 = require("../imports/StringImport");
const SymbolSpecifier_1 = require("../SymbolSpecifier");
const accessorDeclaration_1 = require("./typescript-generators/accessorDeclaration");
const externalModuleImport_1 = require("./typescript-generators/externalModuleImport");
const methodDeclaration_1 = require("./typescript-generators/methodDeclaration");
const namedImport_1 = require("./typescript-generators/namedImport");
const namespaceImport_1 = require("./typescript-generators/namespaceImport");
const parameterDeclaration_1 = require("./typescript-generators/parameterDeclaration");
const propertyDeclaration_1 = require("./typescript-generators/propertyDeclaration");
const stringImport_1 = require("./typescript-generators/stringImport");
const symbolSpecifier_1 = require("./typescript-generators/symbolSpecifier");
const variableDeclaration_1 = require("./typescript-generators/variableDeclaration");
/**
 * Hash with all possible (yet implemented) generators.
 */
exports.GENERATORS = {
    [SymbolSpecifier_1.SymbolSpecifier.name]: symbolSpecifier_1.generateSymbolSpecifier,
    [MethodDeclaration_1.MethodDeclaration.name]: methodDeclaration_1.generateMethodDeclaration,
    [ParameterDeclaration_1.ParameterDeclaration.name]: parameterDeclaration_1.generateParameterDeclaration,
    [PropertyDeclaration_1.PropertyDeclaration.name]: propertyDeclaration_1.generatePropertyDeclaration,
    [VariableDeclaration_1.VariableDeclaration.name]: variableDeclaration_1.generateVariableDelcaration,
    [ExternalModuleImport_1.ExternalModuleImport.name]: externalModuleImport_1.generateExternalModuleImport,
    [NamedImport_1.NamedImport.name]: namedImport_1.generateNamedImport,
    [NamespaceImport_1.NamespaceImport.name]: namespaceImport_1.generateNamespaceImport,
    [StringImport_1.StringImport.name]: stringImport_1.generateStringImport,
    [AccessorDeclaration_1.SetterDeclaration.name]: accessorDeclaration_1.generateAccessorDeclaration,
    [AccessorDeclaration_1.GetterDeclaration.name]: accessorDeclaration_1.generateAccessorDeclaration,
};
/**
 * Generator for typescript code elements. Takes a generatable object and tries to generate typescript code.
 *
 * @export
 * @class TypescriptCodeGenerator
 */
class TypescriptCodeGenerator {
    constructor(options) {
        this.options = options;
    }
    /**
     * Generator function. Calls the specific element generator. If no generator is found, an exception is thrown.
     *
     * @param {Generatable} declaration
     * @returns {string}
     * @throws {NotGeneratableYetError}
     * @memberof TypescriptCodeGenerator
     */
    generate(declaration) {
        if (exports.GENERATORS[declaration.constructor.name]) {
            return exports.GENERATORS[declaration.constructor.name](declaration, this.options);
        }
        throw new NotGeneratableYetError_1.NotGeneratableYetError(declaration);
    }
}
exports.TypescriptCodeGenerator = TypescriptCodeGenerator;
