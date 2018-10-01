"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error that should be thrown, when a generatable is not yet able to be generated.
 *
 * @export
 * @class NotGeneratableYetError
 * @extends {Error}
 */
class NotGeneratableYetError extends Error {
    constructor(generatable) {
        super();
        this.message = `The element "${generatable.constructor.name}" is not yet generatable.`;
    }
}
exports.NotGeneratableYetError = NotGeneratableYetError;
