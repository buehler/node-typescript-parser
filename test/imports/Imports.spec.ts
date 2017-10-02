import { ExternalModuleImport, NamedImport, NamespaceImport, StringImport } from '../../src/imports';

describe('Imports', () => {

    describe('ExternalModuleImport', () => {

        it('should set isNew() when start is undefined', () => {
            const imp = new ExternalModuleImport('lib', 'alias', undefined, 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should set isNew() when end is undefined', () => {
            const imp = new ExternalModuleImport('lib', 'alias', 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should not set isNew() when start and end are defined', () => {
            const imp = new ExternalModuleImport('lib', 'alias', 12, 1337);
            expect(imp.isNew).toBeFalsy();
        });

    });

    describe('NamedImport', () => {

        it('should set isNew() when start is undefined', () => {
            const imp = new NamedImport('lib', undefined, 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should set isNew() when end is undefined', () => {
            const imp = new NamedImport('lib', 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should not set isNew() when start and end are defined', () => {
            const imp = new NamedImport('lib', 12, 1337);
            expect(imp.isNew).toBeFalsy();
        });

    });

    describe('NamespaceImport', () => {

        it('should set isNew() when start is undefined', () => {
            const imp = new NamespaceImport('lib', 'alias', undefined, 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should set isNew() when end is undefined', () => {
            const imp = new NamespaceImport('lib', 'alias', 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should not set isNew() when start and end are defined', () => {
            const imp = new NamespaceImport('lib', 'alias', 12, 1337);
            expect(imp.isNew).toBeFalsy();
        });

    });

    describe('StringImport', () => {

        it('should set isNew() when start is undefined', () => {
            const imp = new StringImport('lib', undefined, 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should set isNew() when end is undefined', () => {
            const imp = new StringImport('lib', 1337);
            expect(imp.isNew).toBeTruthy();
        });

        it('should not set isNew() when start and end are defined', () => {
            const imp = new StringImport('lib', 12, 1337);
            expect(imp.isNew).toBeFalsy();
        });

    });

});
