import { TypescriptParser } from '../../src';
import { Resource } from '../../src/resources';
import { getWorkspaceFile, rootPath } from '../testUtilities';

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

        it('should parse the given async elements in a class', () => {
            console.log(parsed.declarations[0]);
        });

        it.skip('should parse async functions correctly', () => {});

        it.skip('should not parse promise return type as async', () => {});

    });

});
