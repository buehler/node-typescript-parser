import { TypescriptParser } from '../src';
import { getWorkspaceFile, rootPath } from './testUtilities';

describe('Specific usage cases', () => {
    const parser = new TypescriptParser();

    describe('i18next with and without destructure', () => {

        it('should contain i18next reference in not destructured way', async () => {
            const file = getWorkspaceFile('specific-usage-cases/i18next-destructure/import-my-component.tsx');
            const parsed = await parser.parseFile(file, rootPath);
            expect(parsed.usages).toMatchSnapshot();
        });

        it('should contain t reference in destructured way', async () => {
            const file = getWorkspaceFile('specific-usage-cases/i18next-destructure/destructure-my-component.tsx');
            const parsed = await parser.parseFile(file, rootPath);
            expect(parsed.usages).toMatchSnapshot();
        });

    });

    describe('get usage for directly reexported elements', () => {

        it('should contain imported elements in usages', async () => {
            const file = getWorkspaceFile('specific-usage-cases/reexport/reexport-import.ts');
            const parsed = await parser.parseFile(file, rootPath);
            expect(parsed.exports).toMatchSnapshot();
            expect(parsed.usages).toMatchSnapshot();
        });

        it('should contain imported default elements in usages', async () => {
            const file = getWorkspaceFile('specific-usage-cases/reexport/reexport-default.ts');
            const parsed = await parser.parseFile(file, rootPath);
            expect(parsed.exports).toMatchSnapshot();
            expect(parsed.usages).toMatchSnapshot();
        });

    });

});
