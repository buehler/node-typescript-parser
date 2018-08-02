import { readFileSync } from 'fs';
import { ScriptKind } from 'typescript';

import { ClassDeclaration } from '../src/declarations/ClassDeclaration';
import { DeclarationVisibility } from '../src/declarations/DeclarationVisibility';
import { DefaultDeclaration } from '../src/declarations/DefaultDeclaration';
import { EnumDeclaration } from '../src/declarations/EnumDeclaration';
import { FunctionDeclaration } from '../src/declarations/FunctionDeclaration';
import { InterfaceDeclaration } from '../src/declarations/InterfaceDeclaration';
import { TypeAliasDeclaration } from '../src/declarations/TypeAliasDeclaration';
import { VariableDeclaration } from '../src/declarations/VariableDeclaration';
import { AllExport } from '../src/exports/AllExport';
import { AssignedExport } from '../src/exports/AssignedExport';
import { NamedExport } from '../src/exports/NamedExport';
import { ExternalModuleImport } from '../src/imports/ExternalModuleImport';
import { NamedImport } from '../src/imports/NamedImport';
import { NamespaceImport } from '../src/imports/NamespaceImport';
import { StringImport } from '../src/imports/StringImport';
import { File } from '../src/resources';
import { Module } from '../src/resources/Module';
import { Namespace } from '../src/resources/Namespace';
import { Resource } from '../src/resources/Resource';
import { TypescriptParser } from '../src/TypescriptParser';
import { getWorkspaceFile, rootPath } from './testUtilities';

describe('TypescriptParser', () => {

    let parser: TypescriptParser;

    beforeEach(() => {
        parser = new TypescriptParser();
    });

    describe('Source parsing', () => {

        it('should parse a source code string correctly', async () => {
            const parsed = await parser.parseSource(`import {foo} from 'bar'; class Foobar {}; const bar = new Foobar();`);

            expect(parsed).toMatchSnapshot();
        });

    });

    describe('Import parsing', () => {

        const file = getWorkspaceFile('typescript-parser/importsOnly.ts');
        let parsed: Resource;

        beforeEach(async () => {
            parsed = await parser.parseFile(file, rootPath);
        });

        it('should parse imports', () => {
            expect(parsed.imports).toHaveLength(12);
            expect(parsed.imports).toMatchSnapshot();
        });

        it('should parse string import', () => {
            expect(parsed.imports[0]).toBeInstanceOf(StringImport);
            expect(parsed.imports[0]).toMatchSnapshot();
        });

        it('should parse named import', () => {
            expect(parsed.imports[1]).toBeInstanceOf(NamedImport);
            expect(parsed.imports[1]).toMatchSnapshot();
        });

        it('should parse named import with aliased specifier', () => {
            expect(parsed.imports[2]).toBeInstanceOf(NamedImport);
            expect(parsed.imports[2]).toMatchSnapshot();
        });

        it('should parse namespace import', () => {
            expect(parsed.imports[3]).toBeInstanceOf(NamespaceImport);
            expect(parsed.imports[3]).toMatchSnapshot();
        });

        it('should parse external module import', () => {
            expect(parsed.imports[4]).toBeInstanceOf(ExternalModuleImport);
            expect(parsed.imports[4]).toMatchSnapshot();
        });

        it('should parse a multiline import', () => {
            expect(parsed.imports[5]).toBeInstanceOf(NamedImport);
            expect(parsed.imports[5]).toMatchSnapshot();
        });

        it('should parse a default import', () => {
            expect(parsed.imports[6]).toBeInstanceOf(NamedImport);
            expect(parsed.imports[6]).toMatchSnapshot();
        });

        it('should not add any imports to the usages', () => {
            expect(parsed.usages).toHaveLength(0);
        });

        it('should parse a named import with a default statement', () => {
            expect(parsed.imports[7]).toBeInstanceOf(NamedImport);
            expect(parsed.imports[7]).toMatchSnapshot();
        });

        it('should parse a mixed default / named import', () => {
            expect(parsed.imports[8]).toBeInstanceOf(NamedImport);
            expect(parsed.imports[8]).toMatchSnapshot();
        });

        it('should not parse a wrong default statement', async () => {
            const wrong = await parser.parseSource(`import { default } from 'myLib';`);
            expect(wrong).toBeInstanceOf(File);
            expect(wrong).toMatchSnapshot();
        });

    });

    describe('Export parsing', () => {

        const file = getWorkspaceFile('typescript-parser/exportsOnly.ts');
        let parsed: Resource;

        beforeEach(async () => {
            parsed = await parser.parseFile(file, rootPath);
        });

        it('should parse export all from another file', () => {
            expect(parsed.exports[0]).toBeInstanceOf(AllExport);
            expect(parsed.exports[0]).toMatchSnapshot();
        });

        it('should parse export named from another file', () => {
            expect(parsed.exports[1]).toBeInstanceOf(NamedExport);
            expect(parsed.exports[1]).toMatchSnapshot();
        });

        it('should parse aliased export named from another file', () => {
            expect(parsed.exports[1]).toBeInstanceOf(NamedExport);
            expect((parsed.exports[1] as NamedExport).specifiers[1]).toMatchSnapshot();
        });

        it('should parse export assignment', () => {
            expect(parsed.exports[2]).toBeInstanceOf(AssignedExport);

            delete (parsed.exports[2] as any).resource.filePath;
            delete (parsed.exports[2] as any).resource.rootPath;

            expect(parsed.exports[2]).toMatchSnapshot();
        });

        it('should parse default export', () => {
            expect(parsed.declarations[0]).toBeInstanceOf(DefaultDeclaration);

            delete (parsed.declarations[0] as any).resource.filePath;
            delete (parsed.declarations[0] as any).resource.rootPath;

            expect(parsed.declarations[0]).toMatchSnapshot();
        });

    });

    describe('Declaration parsing', () => {

        describe('Enums', () => {

            const file = getWorkspaceFile('typescript-parser/enum.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.declarations).toHaveLength(2);
            });

            it('should parse an enum correctly', () => {
                expect(parsed.declarations[0]).toBeInstanceOf(EnumDeclaration);
                expect(parsed.declarations[0]).toMatchSnapshot();
            });

            it('should parse an exported enum correctly', () => {
                expect(parsed.declarations[1]).toBeInstanceOf(EnumDeclaration);
                expect(parsed.declarations[1]).toMatchSnapshot();
            });

        });

        describe('Type aliases', () => {

            const file = getWorkspaceFile('typescript-parser/typeAlias.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.declarations).toHaveLength(2);
            });

            it('should parse a type alias correctly', () => {
                expect(parsed.declarations[0]).toBeInstanceOf(TypeAliasDeclaration);
                expect(parsed.declarations[0]).toMatchSnapshot();
            });

            it('should parse an exported type alias correctly', () => {
                expect(parsed.declarations[1]).toBeInstanceOf(TypeAliasDeclaration);
                expect(parsed.declarations[1]).toMatchSnapshot();
            });

        });

        describe('Functions', () => {

            const file = getWorkspaceFile('typescript-parser/function.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.declarations).toHaveLength(4);
            });

            it('should parse a function correctly', () => {
                expect(parsed.declarations[0]).toBeInstanceOf(FunctionDeclaration);
                expect(parsed.declarations[0]).toMatchSnapshot();
            });

            it('should parse an exported function correctly', () => {
                expect(parsed.declarations[1]).toBeInstanceOf(FunctionDeclaration);
                expect(parsed.declarations[1]).toMatchSnapshot();
            });

            it('should parse parameters correctly', () => {
                expect((parsed.declarations[0] as FunctionDeclaration).parameters).toMatchSnapshot();
                expect((parsed.declarations[1] as FunctionDeclaration).parameters).toMatchSnapshot();
            });

            it('should parse variables correctly', () => {
                expect((parsed.declarations[0] as FunctionDeclaration).variables).toMatchSnapshot();
                expect((parsed.declarations[1] as FunctionDeclaration).variables).toMatchSnapshot();
            });

            it('should parse return types correctly', () => {
                expect((parsed.declarations[0] as FunctionDeclaration).type).toBe('string');
                expect((parsed.declarations[1] as FunctionDeclaration).type).toBe('void');
                expect((parsed.declarations[2] as FunctionDeclaration).type).toBeUndefined();
            });

            it('should parse a typeguard correctly', () => {
                expect((parsed.declarations[3] as FunctionDeclaration).type).toBe('str is number');
            });

        });

        describe('Parameters', () => {

            const file = getWorkspaceFile('typescript-parser/parameters.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a normal parameter', () => {
                const func = parsed.declarations[0] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse a simple array binding pattern', () => {
                const func = parsed.declarations[1] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an array with tuple type', () => {
                const func = parsed.declarations[2] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an array with undertyped tuple type', () => {
                const func = parsed.declarations[3] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an array with overtyped tuple type', () => {
                const func = parsed.declarations[4] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse a simple object binding pattern ', () => {
                const func = parsed.declarations[5] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an object with type reference', () => {
                const func = parsed.declarations[6] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an object with type literal', () => {
                const func = parsed.declarations[7] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an object with undertyped type literal', () => {
                const func = parsed.declarations[8] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse an object with overtyped type literal', () => {
                const func = parsed.declarations[9] as FunctionDeclaration;
                expect(func.parameters[0]).toMatchSnapshot();
            });

            it('should parse some mixed parameters (all above)', () => {
                expect(parsed.declarations[10]).toMatchSnapshot();
            });

            it('should generate the correct name for an object', () => {
                const func = parsed.declarations[9] as FunctionDeclaration;
                expect(func.parameters[0].name).toMatchSnapshot();
            });

            it('should generate the correct name for an array', () => {
                const func = parsed.declarations[2] as FunctionDeclaration;
                expect(func.parameters[0].name).toMatchSnapshot();
            });

            it('should generate the correct type for an object', () => {
                const func = parsed.declarations[9] as FunctionDeclaration;
                expect(func.parameters[0].type).toMatchSnapshot();
            });

            it('should generate the correct type for an array', () => {
                const func = parsed.declarations[2] as FunctionDeclaration;
                expect(func.parameters[0].type).toMatchSnapshot();
            });

        });

        describe('Variables', () => {

            const file = getWorkspaceFile('typescript-parser/variable.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.declarations).toHaveLength(7);
            });

            it('should parse a non exported variable', () => {
                expect(parsed.declarations[0]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[0]).toMatchSnapshot();
            });

            it('should parse a non exported const', () => {
                expect(parsed.declarations[1]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[1]).toMatchSnapshot();
            });

            it('should parse an exported variable', () => {
                expect(parsed.declarations[2]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[2]).toMatchSnapshot();
            });

            it('should parse an exported const', () => {
                expect(parsed.declarations[3]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[3]).toMatchSnapshot();
            });

            it('should parse an exported scope variable', () => {
                expect(parsed.declarations[4]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[4]).toMatchSnapshot();
            });

            it('should parse an exported multiline variable', () => {
                expect(parsed.declarations[5]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[5]).toMatchSnapshot();
                expect(parsed.declarations[6]).toBeInstanceOf(VariableDeclaration);
                expect(parsed.declarations[6]).toMatchSnapshot();
            });

        });

        describe('Interfaces', () => {

            const file = getWorkspaceFile('typescript-parser/interface.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.declarations).toHaveLength(6);
            });

            it('should parse a non exported interface', () => {
                expect(parsed.declarations[0]).toBeInstanceOf(InterfaceDeclaration);
                expect(parsed.declarations[0]).toMatchSnapshot();
            });

            it('should parse an exported interface', () => {
                expect(parsed.declarations[1]).toBeInstanceOf(InterfaceDeclaration);
                expect(parsed.declarations[1]).toMatchSnapshot();
            });

            it('should parse the returntype of a method', () => {
                const parsedInterface = parsed.declarations[0] as InterfaceDeclaration;

                expect(parsedInterface.methods[0].type).toBeUndefined();
                expect(parsedInterface.methods[1].type).toBe('void');
            });

            it('should parse the type of a property', () => {
                const parsedInterface = parsed.declarations[1] as InterfaceDeclaration;

                expect(parsedInterface.properties[0].type).toBe('string');
                expect(parsedInterface.properties[1].type).toBe('number');
            });

            it('should parse a generic interface', () => {
                const parsedInterface = parsed.declarations[2] as InterfaceDeclaration;

                expect(parsedInterface.typeParameters).toContain('T');
            });

            it('should parse a generic interface with multiple type params', () => {
                const parsedInterface = parsed.declarations[3] as InterfaceDeclaration;

                expect(parsedInterface.typeParameters).toContain('TIn');
                expect(parsedInterface.typeParameters).toContain('TOut');
                expect(parsedInterface.typeParameters).toContain('TError');
            });

            it('should parse optional properties', () => {
                const parsedInterface = parsed.declarations[4] as InterfaceDeclaration;

                expect(parsedInterface.properties).toMatchSnapshot();
            });

            it('should parse optional functions', () => {
                const parsedInterface = parsed.declarations[5] as InterfaceDeclaration;

                expect(parsedInterface).toMatchSnapshot();
            });

        });

        describe('Classes', () => {

            const file = getWorkspaceFile('typescript-parser/class.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.declarations).toHaveLength(10);
            });

            it('should parse an abstract class', () => {
                expect(parsed.declarations[0]).toBeInstanceOf(ClassDeclaration);
                expect(parsed.declarations[0]).toMatchSnapshot();
            });

            it('should parse a non exported class', () => {
                expect(parsed.declarations[1]).toBeInstanceOf(ClassDeclaration);
                expect(parsed.declarations[1]).toMatchSnapshot();
            });

            it('should parse an exported class', () => {
                expect(parsed.declarations[2]).toBeInstanceOf(ClassDeclaration);
                expect(parsed.declarations[2]).toMatchSnapshot();
            });

            it('should parse the returntype of a method', () => {
                const parsedClass = parsed.declarations[0] as ClassDeclaration;

                expect(parsedClass.methods[0].type).toBeUndefined();
                expect(parsedClass.methods[1].type).toBe('void');
            });

            it('should parse the type of a property', () => {
                const parsedClass = parsed.declarations[2] as ClassDeclaration;

                expect(parsedClass.properties[0].type).toBe('string');
            });

            it('should parse the type of a constructor introduced property', () => {
                const parsedClass = parsed.declarations[1] as ClassDeclaration;

                expect(parsedClass.properties[0].type).toBe('string');
            });

            it('should parse a methods visibility', () => {
                const parsedClass = parsed.declarations[1] as ClassDeclaration;

                expect(parsedClass.methods[0].visibility).toBe(DeclarationVisibility.Public);
            });

            it('should parse a generic class', () => {
                const parsedClass = parsed.declarations[3] as ClassDeclaration;

                expect(parsedClass.typeParameters).toContain('T');
            });

            it('should parse a generic class with multiple type params', () => {
                const parsedClass = parsed.declarations[4] as ClassDeclaration;

                expect(parsedClass.typeParameters).toContain('TIn');
                expect(parsedClass.typeParameters).toContain('TOut');
                expect(parsedClass.typeParameters).toContain('TError');
            });

            it('should parse property accessors', () => {
                const parsedClass = parsed.declarations[5] as ClassDeclaration;

                expect(parsedClass.accessors).toMatchSnapshot();
            });

            it('should parse abstract property accessors', () => {
                const parsedClass = parsed.declarations[6] as ClassDeclaration;

                expect(parsedClass.accessors).toMatchSnapshot();
            });

            it('should parse object and array destructure pattern in a class method', () => {
                const parsedClass = parsed.declarations[7] as ClassDeclaration;

                expect(parsedClass.methods).toMatchSnapshot();
            });

            it('should parse object and array destructure pattern in a class constructor', () => {
                const parsedClass = parsed.declarations[7] as ClassDeclaration;

                expect(parsedClass.ctor).toMatchSnapshot();
            });

            it('should parse optional class properties', () => {
                const parsedClass = parsed.declarations[8] as ClassDeclaration;

                expect(parsedClass.properties).toMatchSnapshot();
            });

            it('should parse static class properties and methods', () => {
                const parsedClass = parsed.declarations[9] as ClassDeclaration;

                expect(parsedClass).toMatchSnapshot();
            });

        });

        describe('Modules', () => {

            const file = getWorkspaceFile('typescript-parser/module.ts');
            let parsed: Resource;

            beforeEach(async () => {
                parsed = await parser.parseFile(file, rootPath);
            });

            it('should parse a file', () => {
                expect(parsed.resources).toHaveLength(2);
            });

            it('should parse a module', () => {
                expect(parsed.resources[0]).toBeInstanceOf(Module);
                expect(parsed.resources[0]).toMatchSnapshot();
            });

            it('should parse a namespace', () => {
                expect(parsed.resources[1]).toBeInstanceOf(Namespace);
                expect(parsed.resources[1]).toMatchSnapshot();
            });

        });

    });

    describe('Usage parsing', () => {

        const file = getWorkspaceFile('typescript-parser/usagesOnly.ts');
        let parsed: Resource;

        beforeEach(async () => {
            parsed = await parser.parseFile(file, rootPath);
        });

        it('should parse decorator usages', () => {
            const usages = parsed.usages;

            expect(usages).toContain('ClassDecorator');
            expect(usages).toContain('PropertyDecorator');
            expect(usages).toContain('FunctionDecorator');
            expect(usages).toContain('ParamDecorator');
        });

        it('should parse class member', () => {
            const usages = parsed.usages;

            expect(usages).toContain('notInitializedProperty');
            expect(usages).toContain('typedProperty');
        });

        it('should parse class member types', () => {
            const usages = parsed.usages;

            expect(usages).toContain('TypedPropertyRef');
        });

        it('should parse class member assignment', () => {
            const usages = parsed.usages;

            expect(usages).toContain('AssignedProperty');
        });

        it('should parse params', () => {
            const usages = parsed.usages;

            expect(usages).toContain('param');
        });

        it('should parse param default assignment', () => {
            const usages = parsed.usages;

            expect(usages).toContain('DefaultParam');
        });

        it('should parse return value', () => {
            const usages = parsed.usages;

            expect(usages).toContain('ReturnValue');
        });

        it('should parse property access', () => {
            const usages = parsed.usages;

            expect(usages).toContain('PropertyAccess');
        });

        it('should not parse sub properties of accessed properties', () => {
            const usages = parsed.usages;

            expect(usages).not.toContain('To');
            expect(usages).not.toContain('My');
            expect(usages).not.toContain('Foobar');
        });

        it('should parse function call', () => {
            const usages = parsed.usages;

            expect(usages).toContain('functionCall');
            expect(usages).toContain('MyProperty');
        });

        it('should parse indexer access', () => {
            const usages = parsed.usages;

            expect(usages).toContain('Indexing');
        });

        it('should parse variable assignment', () => {
            const usages = parsed.usages;

            expect(usages).toContain('AssignmentToVariable');
        });

        it('should parse nested identifier', () => {
            const usages = parsed.usages;

            expect(usages).toContain('NestedBinaryAssignment');
        });

        it('should parse a global (file level) used function', () => {
            const usages = parsed.usages;

            expect(usages).toContain('globalFunction');
        });

        it('should parse a global extended class', () => {
            const usages = parsed.usages;

            expect(usages).toContain('DefaultClass');
        });

        it('should parse a generic identifier in a class extension', () => {
            const usages = parsed.usages;

            expect(usages).toContain('GenericType');
        });

        it('should parse a default exported element', () => {
            const usages = parsed.usages;

            expect(usages).toContain('defaultExportUsage');
        });

        it('should parse an indexer property', () => {
            const usages = parsed.usages;

            expect(usages).toContain('indexedUsage');
        });

        it('should parse an indexer property access', () => {
            const usages = parsed.usages;

            expect(usages).toContain('indexingUsage');
        });

    });

    describe('TSX Usage parsing', () => {
        const file = getWorkspaceFile('typescript-parser/usagesOnly.tsx');
        let parsed: Resource;

        beforeEach(async () => {
            parsed = await parser.parseFile(file, rootPath);
        });

        it('should parse a tsx element usage', () => {
            const usages = parsed.usages;

            expect(usages).toContain('myComponent');
            expect(usages).toContain('div');
            expect(usages).toContain('complexComp');
            expect(usages).toContain('SingleComp');
        });

        it('should parse functions inside {}', () => {
            const usages = parsed.usages;

            expect(usages).toContain('myFunc');
        });

        it('should parse component functions inside {}', () => {
            const usages = parsed.usages;

            expect(usages).toContain('MyFunc');
        });

        it('should parse a component inside a map', () => {
            const usages = parsed.usages;

            expect(usages).toContain('AnotherComp');
            expect(usages).toContain('foobarVariable');
        });

        it('should parse a function inside a map', () => {
            const usages = parsed.usages;

            expect(usages).toContain('valFunc');
        });

        it('should parseSource correctly', async () => {
            const parsedSource = await parser.parseSource(readFileSync(file).toString(), ScriptKind.TSX);

            expect(parsedSource.usages).toMatchSnapshot();
        });
    });

    describe('TSX: Specific cases', () => {

        const testFiles = [
            {
                filename: '1.tsx',
                requiredUsages: [
                    'sortBy',
                    'Divider',
                    'Checkbox',
                ],
            },
            {
                filename: '2.tsx',
                requiredUsages: [
                    'ActionDelete',
                    'Divider',
                    'cloneDeep',
                ],
            },
            {
                filename: '3.tsx',
                requiredUsages: [
                    'ImageEdit',
                    'IconButton',
                    'TableHeaderColumn',
                ],
            },
        ];

        for (const testFile of testFiles) {

            it('should parse the correct usages with "parseFile"', async () => {
                const file = getWorkspaceFile(`typescript-parser/specific-cases/${testFile.filename}`);
                const parsed = await parser.parseFile(file, rootPath);

                for (const usage of testFile.requiredUsages) {
                    expect(parsed.usages).toContain(usage);
                }

                expect(parsed.usages).toMatchSnapshot();
            });

            it('should parse the correct usages with "parseFiles"', async () => {
                const file = getWorkspaceFile(`typescript-parser/specific-cases/${testFile.filename}`);
                const parsed = (await parser.parseFiles([file], rootPath))[0];

                for (const usage of testFile.requiredUsages) {
                    expect(parsed.usages).toContain(usage);
                }

                expect(parsed.usages).toMatchSnapshot();
            });

            it('should parse the correct usages with "parseSource"', async () => {
                const file = getWorkspaceFile(`typescript-parser/specific-cases/${testFile.filename}`);
                const fileSource = readFileSync(file).toString();
                const parsed = await parser.parseSource(fileSource, ScriptKind.TSX);

                for (const usage of testFile.requiredUsages) {
                    expect(parsed.usages).toContain(usage);
                }

                expect(parsed.usages).toMatchSnapshot();
            });

        }

    });

    describe('JavaScript parsing', () => {

        const file = getWorkspaceFile('typescript-parser/javascript.js');

        it('should parse a simple javascript file correctly with "parseFile"', async () => {
            const parsed = await parser.parseFile(file, rootPath);
            delete parsed.filePath;
            delete (parsed as any).rootPath;

            expect(parsed).toMatchSnapshot();
        });

        it('should parse a simple javascript file correctly with "parseFiles"', async () => {
            const parsed = await parser.parseFiles([file], rootPath);
            delete parsed[0].filePath;
            delete (parsed[0] as any).rootPath;

            expect(parsed).toMatchSnapshot();
        });

        it('should parse a simple javascript file correctly with "parseSource"', async () => {
            const content = readFileSync(file).toString();
            const parsed = await parser.parseSource(content, ScriptKind.JS);

            expect(parsed).toMatchSnapshot();
        });

    });

    describe('JSX parsing', () => {

        const file = getWorkspaceFile('typescript-parser/jsx.jsx');

        it('should parse a simple javascript react file correctly with "parseFile"', async () => {
            const parsed = await parser.parseFile(file, rootPath);
            delete parsed.filePath;
            delete (parsed as any).rootPath;

            expect(parsed).toMatchSnapshot();
        });

        it('should parse a simple javascript react file correctly with "parseFiles"', async () => {
            const parsed = await parser.parseFiles([file], rootPath);
            delete parsed[0].filePath;
            delete (parsed[0] as any).rootPath;

            expect(parsed).toMatchSnapshot();
        });

        it('should parse a simple javascript react file correctly with "parseSource"', async () => {
            const content = readFileSync(file).toString();
            const parsed = await parser.parseSource(content, ScriptKind.JSX);

            expect(parsed).toMatchSnapshot();
        });

    });

    describe('Specific sources', () => {

        it('should parse generics in functions in classes correctly', async () => {
            const parsed = await parser.parseSource(
                `export class TestClass {
                    public test() {
                        let a = <T>() => { let b = null; };
                    }
                }`,
                ScriptKind.TS,
            );
            expect(parsed).toMatchSnapshot();
        });

    });

    describe('Parses Webpack Bundle', () => {

        const file = getWorkspaceFile('typescript-parser/webpack-bundle.js');

        it('should parse the whole webpack bundle', async () => {
            await parser.parseFile(file, rootPath);
        });

    });

});
