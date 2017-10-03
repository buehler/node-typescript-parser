import { AccessorDeclaration } from './AccessorDeclaration';
import { ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration } from './Declaration';
import { MethodDeclaration } from './MethodDeclaration';
import { PropertyDeclaration } from './PropertyDeclaration';

/**
 * Interface declaration that contains defined properties and methods.
 *
 * @export
 * @class InterfaceDeclaration
 * @implements {ExportableDeclaration}
 * @implements {GenericDeclaration}
 */
export class InterfaceDeclaration implements ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration {
    public accessors: AccessorDeclaration[];
    public typeParameters: string[] | undefined;
    public properties: PropertyDeclaration[] = [];
    public methods: MethodDeclaration[] = [];

    constructor(
        public name: string,
        public isExported: boolean,
        public start?: number,
        public end?: number,
    ) { }
}
