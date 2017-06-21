import { Declaration } from './Declaration';

/**
 * Module (namespace) declaration. Does export a whole module or namespace that is mainly used by
 * external declaration files.
 * 
 * @export
 * @class ModuleDeclaration
 * @implements {Declaration}
 */
export class ModuleDeclaration implements Declaration {
    constructor(
        public name: string,
        public start?: number,
        public end?: number,
    ) { }
}
