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

});
