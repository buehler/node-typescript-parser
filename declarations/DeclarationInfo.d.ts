import { Declaration } from './Declaration';
/**
 * Class that defines information about a declaration.
 * Contains the declaration and the origin of the declaration.
 *
 * @export
 * @class DeclarationInfo
 */
export declare class DeclarationInfo {
    declaration: Declaration;
    from: string;
    constructor(declaration: Declaration, from: string);
}
