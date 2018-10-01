import { Generatable } from '../code-generators/TypescriptCodeGenerator';
/**
 * Error that should be thrown, when a generatable is not yet able to be generated.
 *
 * @export
 * @class NotGeneratableYetError
 * @extends {Error}
 */
export declare class NotGeneratableYetError extends Error {
    constructor(generatable: Generatable);
}
