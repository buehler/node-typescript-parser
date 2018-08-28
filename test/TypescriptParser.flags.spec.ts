import { TypescriptParser } from '../src';
import { Resource } from '../src/resources';
import { getWorkspaceFile, rootPath } from './testUtilities';

describe('TypescriptParser', () => {

    let parser: TypescriptParser;

    beforeEach(() => {
        parser = new TypescriptParser();
    });

    describe('isAsync Flag', () => {

        const file = getWorkspaceFile('typescript-parser/async.ts');
        let parsed: Resource;

        beforeEach(async () => {
            parsed = await parser.parseFile(file, rootPath);
        });

        it('should parse the given async file', () => {
            console.log(parsed);
        });

    });

});
