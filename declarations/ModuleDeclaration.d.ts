import { Declaration } from './Declaration';
/**
 * Module (namespace) declaration. Does export a whole module or namespace that is mainly used by
 * external declaration files.
 *
 * @export
 * @class ModuleDeclaration
 * @implements {Declaration}
 */
export declare class ModuleDeclaration implements Declaration {
    name: string;
    start?: number | undefined;
    end?: number | undefined;
    constructor(name: string, start?: number | undefined, end?: number | undefined);
}
