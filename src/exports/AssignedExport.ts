import { ExportableDeclaration } from '../declarations/Declaration';
import { Module } from '../resources/Module';
import { Namespace } from '../resources/Namespace';
import { Resource } from '../resources/Resource';
import { isExportableDeclaration } from '../type-guards/TypescriptHeroGuards';
import { Export } from './Export';

/**
 * Declares an all export (i.e. export * from ...).
 * 
 * @export
 * @class AssignedExport
 * @implements {Export}
 */
export class AssignedExport implements Export {
    /**
     * Returns a list of exported objects of this export.
     * This returns a list of possible exportable declarations or further exported resources.
     * 
     * @readonly
     * @type {((ExportableDeclaration | Resource)[])}
     * @memberof AssignedExport
     */
    public get exported(): (ExportableDeclaration | Resource)[] {
        return <(ExportableDeclaration | Resource)[]>[
            ...this.resource.declarations
                .filter(o =>
                    isExportableDeclaration(o) && o.isExported && o.name === this.declarationIdentifier),
            ...this.resource.resources
                .filter(o =>
                    (o instanceof Namespace || o instanceof Module) && o.name === this.declarationIdentifier),
        ];
    }

    constructor(
        public start: number,
        public end: number,
        public declarationIdentifier: string,
        private resource: Resource,
    ) { }
}
