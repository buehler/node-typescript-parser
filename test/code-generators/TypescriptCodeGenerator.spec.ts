import { TypescriptCodeGenerator } from '../../src/code-generators/TypescriptCodeGenerator';
import { TypescriptGenerationOptions } from '../../src/code-generators/TypescriptGenerationOptions';
import { ClassDeclaration } from '../../src/declarations';
import { DeclarationVisibility } from '../../src/declarations/DeclarationVisibility';
import { MethodDeclaration } from '../../src/declarations/MethodDeclaration';
import { ParameterDeclaration } from '../../src/declarations/ParameterDeclaration';
import { PropertyDeclaration } from '../../src/declarations/PropertyDeclaration';
import { VariableDeclaration } from '../../src/declarations/VariableDeclaration';
import { NotGeneratableYetError } from '../../src/errors/NotGeneratableYetError';
import { ExternalModuleImport } from '../../src/imports/ExternalModuleImport';
import { NamedImport } from '../../src/imports/NamedImport';
import { NamespaceImport } from '../../src/imports/NamespaceImport';
import { StringImport } from '../../src/imports/StringImport';
import { SymbolSpecifier } from '../../src/SymbolSpecifier';

const namedImport = new NamedImport('namedLib');
const multiLineNamedImport = new NamedImport('multiLineNamedLib');

namedImport.specifiers = [
    new SymbolSpecifier('spec1'),
    new SymbolSpecifier('spec2', 'alias2'),
];

multiLineNamedImport.specifiers = [
    new SymbolSpecifier('spec1'),
    new SymbolSpecifier('spec2'),
    new SymbolSpecifier('spec3'),
    new SymbolSpecifier('spec4'),
    new SymbolSpecifier('spec5'),
    new SymbolSpecifier('spec6'),
    new SymbolSpecifier('spec7'),
    new SymbolSpecifier('spec8'),
    new SymbolSpecifier('spec9'),
    new SymbolSpecifier('spec10'),
    new SymbolSpecifier('spec11'),
    new SymbolSpecifier('spec12'),
    new SymbolSpecifier('spec13'),
    new SymbolSpecifier('spec14'),
    new SymbolSpecifier('spec15'),
];


describe('TypescriptCodeGenerator', () => {
    const defaultOptions: TypescriptGenerationOptions = {
        eol: ';',
        multiLineTrailingComma: true,
        multiLineWrapThreshold: 125,
        spaceBraces: true,
        stringQuoteStyle: `'`,
        tabSize: 4,
    };
    const generatables = [
        new SymbolSpecifier('SymbolSpecifier'),
        new SymbolSpecifier('SymbolSpecifier', 'WithAlias'),
        new MethodDeclaration('myMethod', false, DeclarationVisibility.Public, 'void'),
        new MethodDeclaration('myAbstractMethod', true, DeclarationVisibility.Public, 'string'),
        new MethodDeclaration('myProtectedMethod', false, DeclarationVisibility.Protected, 'void'),
        new MethodDeclaration('myProtectedAbstractMethod', true, DeclarationVisibility.Protected, 'string'),
        new MethodDeclaration('myPrivateMethod', false, DeclarationVisibility.Private, 'void'),
        new MethodDeclaration('myPrivateAbstractMethod', true, DeclarationVisibility.Private, 'string'),
        new ParameterDeclaration('param', ''),
        new ParameterDeclaration('stringParam', 'string'),
        new PropertyDeclaration('pubProperty', DeclarationVisibility.Public, 'string'),
        new PropertyDeclaration('protProperty', DeclarationVisibility.Protected, 'number'),
        new PropertyDeclaration('prvProperty', DeclarationVisibility.Private, 'boolean'),
        new VariableDeclaration('myVar', false, false, 'string'),
        new VariableDeclaration('myConst', true, false, 'string'),
        new ExternalModuleImport('externalModuleLib', 'externalAlias'),
        new StringImport('stringLib'),
        new NamespaceImport('namespaceLib', 'namespaceAlias'),
        namedImport,
        multiLineNamedImport,
        new NamedImport('emptyImport'),
    ];

    for (const generatable of generatables) {

        it(`should generate the correct code for ${generatable.constructor.name}`, () => {
            const generator = new TypescriptCodeGenerator(defaultOptions);

            expect(generator.generate(generatable)).toMatchSnapshot();
        });

    }

    it('should throw on non generatable element', () => {
        const generator = new TypescriptCodeGenerator(defaultOptions);

        expect(() => generator.generate(new ClassDeclaration('foo', true))).toThrow(NotGeneratableYetError);
    });
});
