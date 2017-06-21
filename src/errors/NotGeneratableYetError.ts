import { Generatable } from '../code-generators/TypescriptCodeGenerator';

/**
 * Error that should be thrown, when a generatable is not yet able to be generated.
 * 
 * @export
 * @class NotGeneratableYetError
 * @extends {Error}
 */
export class NotGeneratableYetError extends Error {
    constructor(generatable: Generatable) {
        super();
        this.message = `The element "${generatable.constructor.name}" is not yet generatable.`;
    }
}
