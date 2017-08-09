import * as os from 'os';

import { normalizeFilename, normalizePathUri } from '../../src/utilities/PathHelpers';

describe('PathHelpers', () => {

    describe('normalizePathUri()', () => {
        const orig = os.platform;

        afterEach(() => {
            (os as any).platform = orig;
        });

        it('should remove file:// on unix', () => {
            (os as any).platform = jest.fn(() => 'unix');

            expect(normalizePathUri('file:///root/file.txt')).toBe('/root/file.txt');
        });

        it('should remove file:// on mac', () => {
            (os as any).platform = jest.fn(() => 'darwin');

            expect(normalizePathUri('file:///root/file.txt')).toBe('/root/file.txt');
        });

        it('should remove file:/// on windows', () => {
            (os as any).platform = jest.fn(() => 'win32');

            expect(normalizePathUri('file:///C:/root/file.txt')).toBe('C:/root/file.txt');
            expect(normalizePathUri('file:///C:\root\file.txt')).toBe('C:\root\file.txt');
        });

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
