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
export declare class InterfaceDeclaration implements ClassLikeDeclaration, ExportableDeclaration, GenericDeclaration {
    name: string;
    isExported: boolean;
    start?: number | undefined;
    end?: number | undefined;
    accessors: AccessorDeclaration[];
    typeParameters: string[] | undefined;
    properties: PropertyDeclaration[];
    methods: MethodDeclaration[];
    constructor(name: string, isExported: boolean, start?: number | undefined, end?: number | undefined);
}
