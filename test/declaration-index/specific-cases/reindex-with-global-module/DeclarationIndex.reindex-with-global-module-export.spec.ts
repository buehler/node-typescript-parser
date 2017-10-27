import { FileChanges } from '../../../../src';
import { join, resolve } from '../../../testUtilities';

import { DeclarationIndex } from '../../../../src/DeclarationIndex';
import { TypescriptParser } from '../../../../src/TypescriptParser';

describe('DeclarationIndex - specific case "reindex-with-global-module"', () => {

    const rootPath = resolve(
        __dirname, '..', '..', '..', '_workspace', 'declaration-index', 'specific-cases',
        'reindex-with-global-module-export',
    );
    const files = [
        join(rootPath, 'node_modules', '@types', 'some-module', 'index.d.ts'),
        join(rootPath, 'classes.ts'),
    ];

    let declarationIndex: DeclarationIndex;

    beforeEach(async () => {
        declarationIndex = new DeclarationIndex(new TypescriptParser(), rootPath);
        await declarationIndex.buildIndex(files);
    });

    it('should parse the declarations', () => {
        expect(declarationIndex.index['some-module']).toMatchSnapshot();
        expect(declarationIndex.index['SomeInterface']).toMatchSnapshot();
        expect(declarationIndex.index['MyClass']).toMatchSnapshot();
    });

    it(`reindex local file doesn't throw error`, async () => {
        const changes: FileChanges = {
            created: [],
            deleted: [],
            updated: [files[1]],
        };
        await declarationIndex.reindexForChanges(changes);
    });

});
