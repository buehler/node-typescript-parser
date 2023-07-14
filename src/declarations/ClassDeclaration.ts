import { AccessorDeclaration } from './AccessorDeclaration';
import { ConstructorDeclaration } from './ConstructorDeclaration';
import { AbstractDeclaration, ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration,
} from './Declaration';
import { InterfaceDeclaration } from './InterfaceDeclaration';
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
 * @implements {AbstractDeclaration}
 */
export class ClassDeclaration
    implements
        ClassLikeDeclaration,
        ExportableDeclaration,
        GenericDeclaration,
        AbstractDeclaration
{
    public ctor: ConstructorDeclaration | undefined;
    public accessors: AccessorDeclaration[] = [];
    public properties: PropertyDeclaration[] = [];
    public methods: MethodDeclaration[] = [];
    public typeParameters: string[] | undefined;
    public isAbstract: boolean = false;
    public implements: InterfaceDeclaration[] = [];
    public extends: ClassDeclaration[] = [];
    constructor(
        public name: string,
        public isExported: boolean,
        public start?: number,
        public end?: number,
  ) {}
}
