import { join, resolve } from 'path';

import { DeclarationIndex } from '../../../../src/DeclarationIndex';
import { TypescriptParser } from '../../../../src/TypescriptParser';

describe('DeclarationIndex - specific case "body-parser"', () => {

    const rootPath = resolve(
        __dirname, '..', '..', '..', '_workspace', 'declaration-index', 'specific-cases', 'body-parser',
    );
    const files = [
        join(rootPath, 'node_modules', '@types', 'body-parser', 'index.d.ts'),
    ];
    
    let declarationIndex: DeclarationIndex;

    beforeEach(() => {
        declarationIndex = new DeclarationIndex(new TypescriptParser(), rootPath);
    });

    it('should parse the declarations', async () => {
        await declarationIndex.buildIndex(files);
        console.log(declarationIndex.index['bodyParser']);
    });

});
