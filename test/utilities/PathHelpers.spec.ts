import { normalizeFilename } from '../../src/utilities/PathHelpers';

describe('PathHelpers', () => {

    describe('normalizePathUri()', () => {

        // it('should')

    });

    describe('normalizeFilename()', () => {

        for (const ending of ['d.ts', 'd.tsx', 'ts', 'tsx', 'js', 'jsx']) {
            it(`should remove the ending "${ending}"`, () => {
                const file = `./foobar.${ending}`;
                expect(normalizeFilename(file)).toBe('./foobar');
            });
        }

    });

});
