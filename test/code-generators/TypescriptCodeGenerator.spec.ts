import { TypescriptCodeGenerator } from '../../src/code-generators/TypescriptCodeGenerator';
import { TypescriptGenerationOptions, MultiLineImportRule } from '../../src/code-generators/TypescriptGenerationOptions';
import { ClassDeclaration } from '../../src/declarations';
import { GetterDeclaration, SetterDeclaration } from '../../src/declarations/AccessorDeclaration';
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
namedImport.specifiers = [
    new SymbolSpecifier('spec1'),
    new SymbolSpecifier('spec2', 'alias2'),
];

const multiLineNamedImport = new NamedImport('multiLineNamedLib');
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
    new SymbolSpecifier('spec16'),
    new SymbolSpecifier('spec17'),
    new SymbolSpecifier('spec18'),
];

const defaultImport = new NamedImport('defaultImport');
defaultImport.defaultAlias = 'Default';

const defaultWithNamed = new NamedImport('defaultWithNamedImport');
defaultWithNamed.defaultAlias = 'Default';
defaultWithNamed.specifiers = namedImport.specifiers;

const defaultWithNamedMultiline = new NamedImport('defaultWithNamedMultilineImport');
defaultWithNamedMultiline.defaultAlias = 'Default';
defaultWithNamedMultiline.specifiers = multiLineNamedImport.specifiers;

describe('TypescriptCodeGenerator', () => {
    const defaultOptions: TypescriptGenerationOptions = {
        eol: ';',
        multiLineTrailingComma: true,
        wrapMethod: MultiLineImportRule.oneImportPerLineOnlyAfterThreshold,
        multiLineWrapThreshold: 125,
        spaceBraces: true,
        stringQuoteStyle: `'`,
        tabSize: 4,
        insertSpaces: true,
    };
    const impOptions_oneImportPerLineOnlyAfterThreshold: TypescriptGenerationOptions = {
        eol: ';',
        multiLineTrailingComma: true,
        wrapMethod: MultiLineImportRule.oneImportPerLineOnlyAfterThreshold,
        multiLineWrapThreshold: 125,
        spaceBraces: true,
        stringQuoteStyle: `"`,
        tabSize: 2,
        insertSpaces: true,
    };
    const impOptions_strictlyOneImportPerLine: TypescriptGenerationOptions = {
        eol: ';',
        multiLineTrailingComma: true,
        wrapMethod: MultiLineImportRule.strictlyOneImportPerLine,
        multiLineWrapThreshold: 125,
        spaceBraces: true,
        stringQuoteStyle: `"`,
        tabSize: 2,
        insertSpaces: true,
    };
    const impOptions_multipleImportsPerLine: TypescriptGenerationOptions = {
        eol: ';',
        multiLineTrailingComma: true,
        wrapMethod: MultiLineImportRule.multipleImportsPerLine,
        multiLineWrapThreshold: 125,
        spaceBraces: true,
        stringQuoteStyle: `"`,
        tabSize: 2,
        insertSpaces: true,
    };
    const imports = [
        new ExternalModuleImport('externalModuleLib', 'externalAlias'),
        new StringImport('stringLib'),
        new NamespaceImport('namespaceLib', 'namespaceAlias'),
        namedImport,
        multiLineNamedImport,
        new NamedImport('emptyImport'),
        defaultImport,
        defaultWithNamed,
        defaultWithNamedMultiline,
    ];
    const generatables = [
        ...imports,
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
        new GetterDeclaration('pubGetter', DeclarationVisibility.Public, 'string', false),
        new GetterDeclaration('protGetter', DeclarationVisibility.Protected, 'string', false),
        new GetterDeclaration('privGetter', DeclarationVisibility.Private, 'string', false),
        new GetterDeclaration('pubNoTypeGetter', DeclarationVisibility.Public, undefined, false),
        new GetterDeclaration('protNoTypeGetter', DeclarationVisibility.Protected, undefined, false),
        new GetterDeclaration('privNoTypeGetter', DeclarationVisibility.Private, undefined, false),
        new GetterDeclaration('pubAbsGetter', DeclarationVisibility.Public, 'number', true),
        new GetterDeclaration('protAbsGetter', DeclarationVisibility.Protected, 'number', true),
        new GetterDeclaration('privAbsGetter', DeclarationVisibility.Private, 'number', true),
        new SetterDeclaration('pubSetter', DeclarationVisibility.Public, 'string', false),
        new SetterDeclaration('protSetter', DeclarationVisibility.Protected, 'string', false),
        new SetterDeclaration('privSetter', DeclarationVisibility.Private, 'string', false),
        new SetterDeclaration('pubNoTypeSetter', DeclarationVisibility.Public, undefined, false),
        new SetterDeclaration('protNoTypeSetter', DeclarationVisibility.Protected, undefined, false),
        new SetterDeclaration('privNoTypeSetter', DeclarationVisibility.Private, undefined, false),
        new SetterDeclaration('pubAbsSetter', DeclarationVisibility.Public, 'number', true),
        new SetterDeclaration('protAbsSetter', DeclarationVisibility.Protected, 'number', true),
        new SetterDeclaration('privAbsSetter', DeclarationVisibility.Private, 'number', true),
    ];

    for (const generatable of generatables) {

        it(`should generate the correct code for ${generatable.constructor.name}`, () => {
            const generator = new TypescriptCodeGenerator(defaultOptions);

            expect(generator.generate(generatable)).toMatchSnapshot();
        });

    }

    for (const imp of imports) {

        it(`should generate the correct code for ${imp.constructor.name} with single quote`, () => {
            const generator = new TypescriptCodeGenerator(defaultOptions);

            expect(generator.generate(imp)).toMatchSnapshot();
        });

        it(`should generate the correct code for ${imp.constructor.name} with double quote`, () => {
            const generator = new TypescriptCodeGenerator(defaultOptions);

            expect(generator.generate(imp)).toMatchSnapshot();
        });

        it(`should generate the correct code for ${imp.constructor.name} with double quote`, () => {
            const generator = new TypescriptCodeGenerator(impOptions_oneImportPerLineOnlyAfterThreshold);

            expect(generator.generate(imp)).toMatchSnapshot();
        });

        it(`should generate the correct code for ${imp.constructor.name} with double quote`, () => {
            const generator = new TypescriptCodeGenerator(impOptions_strictlyOneImportPerLine);

            expect(generator.generate(imp)).toMatchSnapshot();
        });

        it(`should generate multiple imports per line for ${imp.constructor.name} with single quote`, () => {
            const generator = new TypescriptCodeGenerator(impOptions_multipleImportsPerLine);

            expect(generator.generate(imp)).toMatchSnapshot();
        });
    }

    it('should throw on non generatable element', () => {
        const generator = new TypescriptCodeGenerator(defaultOptions);

        expect(() => generator.generate(new ClassDeclaration('foo', true))).toThrow(NotGeneratableYetError);
    });
});
