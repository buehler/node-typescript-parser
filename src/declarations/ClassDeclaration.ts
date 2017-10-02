import { AccessorDeclaration } from './AccessorDeclaration';
import { ConstructorDeclaration } from './ConstructorDeclaration';
import { ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration } from './Declaration';
import { MethodDeclaration } from './MethodDeclaration';
import { PropertyDeclaration } from './PropertyDeclaration';

/**
 * Class declaration that contains methods, properties and a constructor
 *
 * @export
 * @class ClassDeclaration
 * @implements {ClassLikeDeclaration}
 * @implements {ExportableDeclaration}
 * @implements {GenericDeclaration}
 */
export class ClassDeclaration implements ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration {
    public ctor: ConstructorDeclaration;
    public accessors: AccessorDeclaration[] = [];
    public properties: PropertyDeclaration[] = [];
    public methods: MethodDeclaration[] = [];
    public typeParameters: string[] | undefined;

    constructor(
        public name: string,
        public isExported: boolean,
        public start?: number,
        public end?: number,
    ) { }
}
