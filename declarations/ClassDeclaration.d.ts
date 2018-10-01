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
export declare class ClassDeclaration implements ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration {
    name: string;
    isExported: boolean;
    start?: number | undefined;
    end?: number | undefined;
    ctor: ConstructorDeclaration;
    accessors: AccessorDeclaration[];
    properties: PropertyDeclaration[];
    methods: MethodDeclaration[];
    typeParameters: string[] | undefined;
    constructor(name: string, isExported: boolean, start?: number | undefined, end?: number | undefined);
}
