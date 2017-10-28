import mockFs = require('mock-fs');
import { join, resolve } from '../testUtilities';

import { DeclarationIndex } from '../../src/DeclarationIndex';
import { ClassDeclaration } from '../../src/declarations';
import { TypescriptParser } from '../../src/TypescriptParser';

describe('DeclarationIndex', () => {

    const rootPath = resolve(__dirname, '..', '_workspace', 'declaration-index');
    let declarationIndex: DeclarationIndex;

    beforeEach(() => {
        declarationIndex = new DeclarationIndex(new TypescriptParser(), rootPath);
    });

    it('should not process a circular export cycle', async () => {
        const files = [
            join(rootPath, 'circular-export', 'circularExport1.ts'),
            join(rootPath, 'circular-export', 'circularExport2.ts'),
        ];
        await declarationIndex.buildIndex(files);
    });

    it('should not have an index ready without build', () => {
        expect(declarationIndex.indexReady).toBe(false);
    });

    it('should have an index ready after build', async () => {
        expect(declarationIndex.indexReady).toBe(false);
        await declarationIndex.buildIndex([]);
        expect(declarationIndex.indexReady).toBe(true);
    });

    describe('buildIndex()', () => {

        const files = [
            join(rootPath, 'classes.ts'),
            join(rootPath, 'another-classes.ts'),
            join(rootPath, 'helper-functions.ts'),
            join(rootPath, 'myReactTemplate.tsx'),
            join(rootPath, 'prototype-funcs.ts'),
            join(rootPath, 'index.ts'),
            join(rootPath, '_index.ts'),
        ];

        beforeEach(async () => {
            await declarationIndex.buildIndex(files);
        });

        it('should contain certain parsedResources', () => {
            const idx: any = declarationIndex;
            const resources = Object.assign(Object.create(null), idx.parsedResources);

            expect(Object.keys(resources)).toMatchSnapshot();
        });

        it('should contain declarations with names', () => {
            const list = declarationIndex.index!['isString'];

            expect(list).toMatchSnapshot();
        });

        it('should contain a declaration name with multiple declarations', () => {
            const list = declarationIndex.index!['Class1'];

            expect(list).toMatchSnapshot();
        });

        it('should not crash on prototype methods (i.e. toString, hasOwnProperty)', () => {
            const list = declarationIndex.index!['toString'];
            expect(list).toMatchSnapshot();

            const list2 = declarationIndex.index!['hasOwnProperty'];
            expect(list).toMatchSnapshot();
        });

        it('should contain a declaration from a *.tsx file', () => {
            const idx: any = declarationIndex;
            const resources = Object.assign(Object.create(null), idx.parsedResources);
            const resource = resources['/myReactTemplate'];

            delete resource.filePath;
            delete resource.rootPath;

            expect(resource).toMatchSnapshot();
        });

        it('should properly index non-barrel files ending in `index`', () => {
            const barrelExport = declarationIndex.index!['barrelExport'];
            expect(barrelExport).toMatchSnapshot();

            const _index = declarationIndex.index!['_index'];
            expect(_index).toMatchSnapshot();
        });

    });

    describe('reindexForChanges()', () => {

        afterEach(() => {
            mockFs.restore();
        });

        it('should correctly add a new created file', async () => {
            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();

            await declarationIndex.reindexForChanges({
                created: [join(rootPath, 'helper-functions.ts')],
                updated: [],
                deleted: [],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should correctly update a modified file', async () => {

            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();

            mockFs({
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }`,
            });

            await declarationIndex.reindexForChanges({
                created: [],
                updated: [join(rootPath, 'classes.ts')],
                deleted: [],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should correctly remove a deleted file', async () => {
            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();

            await declarationIndex.reindexForChanges({
                created: [],
                updated: [],
                deleted: [join(rootPath, 'classes.ts')],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should correctly add a file that is exported', async () => {
            mockFs({
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }`,
            });

            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                ],
            );

            mockFs({
                [join(rootPath, 'foobar.ts')]: `export class Foobar{}`,
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }

                                                export * from './foobar'`,
            });

            expect(declarationIndex.index).toMatchSnapshot();

            await declarationIndex.reindexForChanges({
                created: [join(rootPath, 'foobar.ts')],
                updated: [join(rootPath, 'classes.ts')],
                deleted: [],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should correctly add an empty file', async () => {
            mockFs({
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }`,
            });

            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                ],
            );

            mockFs({
                [join(rootPath, 'foobar.ts')]: ``,
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }`,
            });

            expect(declarationIndex.index).toMatchSnapshot();

            await declarationIndex.reindexForChanges({
                created: [join(rootPath, 'foobar.ts')],
                updated: [join(rootPath, 'classes.ts')],
                deleted: [],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should correctly update a file that is exported', async () => {
            mockFs({
                [join(rootPath, 'foobar.ts')]: `export class Foobar{}`,
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }`,
            });

            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                    join(rootPath, 'foobar.ts'),
                ],
            );

            mockFs({
                [join(rootPath, 'foobar.ts')]: `export class Foobar{} export class Barbaz{}`,
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }

                                                export * from './foobar'`,
            });

            expect(declarationIndex.index).toMatchSnapshot();

            await declarationIndex.reindexForChanges({
                created: [],
                updated: [join(rootPath, 'classes.ts'), join(rootPath, 'foobar.ts')],
                deleted: [],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should correctly remove an exported file', async () => {
            mockFs({
                [join(rootPath, 'foobar.ts')]: `export class Foobar{}`,
                [join(rootPath, 'classes.ts')]: `export class MyClass {
                                                    public doSomething(): void { }
                                                }

                                                export class FancierLibraryClass {
                                                    public doSomethingAwesome(): void { }
                                                }

                                                export * from './foobar'`,
            });

            await declarationIndex.buildIndex(
                [
                    join(rootPath, 'classes.ts'),
                    join(rootPath, 'foobar.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();

            await declarationIndex.reindexForChanges({
                created: [],
                updated: [join(rootPath, 'classes.ts')],
                deleted: [join(rootPath, 'foobar.ts')],
            });

            expect(declarationIndex.index).toMatchSnapshot();
        });

    });

    describe('calculateIndexDelta()', () => {

        it('should calculate a newly added declaration', () => {
            const oldIndex = {};
            const newIndex = {
                Foobar: [{ declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' }],
            };

            expect(DeclarationIndex.calculateIndexDelta(oldIndex, newIndex)).toMatchSnapshot();
        });

        it('should calculate a removed declaration', () => {
            const oldIndex = {
                Foobar: [{ declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' }],
            };
            const newIndex = {};

            expect(DeclarationIndex.calculateIndexDelta(oldIndex, newIndex)).toMatchSnapshot();
        });

        it('should calculate correctly when nothing happend', () => {
            const oldIndex = {
                Foobar: [{ declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' }],
            };
            const newIndex = {
                Foobar: [{ declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' }],
            };

            expect(DeclarationIndex.calculateIndexDelta(oldIndex, newIndex)).toMatchSnapshot();
        });

        it('should calculate an updated key (removed 1 declaration)', () => {
            const oldIndex = {
                Foobar: [
                    { declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' },
                    { declaration: new ClassDeclaration('Foobar', true, 10, 100), from: './foobar2' },
                ],
            };
            const newIndex = {
                Foobar: [
                    { declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' },
                ],
            };

            expect(DeclarationIndex.calculateIndexDelta(oldIndex, newIndex)).toMatchSnapshot();
        });

        it('should calculate an updated key (added 1 declaration)', () => {
            const oldIndex = {
                Foobar: [
                    { declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' },
                ],
            };
            const newIndex = {
                Foobar: [
                    { declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' },
                    { declaration: new ClassDeclaration('Foobar', true, 10, 100), from: './foobar2' },
                ],
            };

            expect(DeclarationIndex.calculateIndexDelta(oldIndex, newIndex)).toMatchSnapshot();
        });

        it('should calculate an updated key (changed 1 declaration', () => {
            const oldIndex = {
                Foobar: [
                    { declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' },
                    { declaration: new ClassDeclaration('Foobar', true, 10, 100), from: './foobar2' },
                ],
            };
            const newIndex = {
                Foobar: [
                    { declaration: new ClassDeclaration('Foobar', true, 0, 100), from: './foobar' },
                    { declaration: new ClassDeclaration('Foobar', true, 15, 100), from: './foobar2' },
                ],
            };

            expect(DeclarationIndex.calculateIndexDelta(oldIndex, newIndex)).toMatchSnapshot();
        });

    });

    describe('exports', () => {

        const folderRoot = join(rootPath, 'exports');

        it('should parse one single file correctly', async () => {
            await declarationIndex.buildIndex(
                [
                    join(folderRoot, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should export all elements correctly (export * from)', async () => {
            await declarationIndex.buildIndex(
                [
                    join(folderRoot, 'export-all.ts'),
                    join(folderRoot, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should export some elements correctly (export {} from)', async () => {
            await declarationIndex.buildIndex(
                [
                    join(folderRoot, 'export-some.ts'),
                    join(folderRoot, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should export some elements as alias correctly (export {x as y} from)', async () => {
            await declarationIndex.buildIndex(
                [
                    join(folderRoot, 'export-alias.ts'),
                    join(folderRoot, 'classes.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();
        });

        it('should export elements that are already exported correclty', async () => {
            await declarationIndex.buildIndex(
                [
                    join(folderRoot, 'export-some.ts'),
                    join(folderRoot, 'classes.ts'),
                    join(folderRoot, 'export-from-export.ts'),
                ],
            );

            expect(declarationIndex.index).toMatchSnapshot();
        });

    });

});
