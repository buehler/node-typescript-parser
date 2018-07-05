import { TypedDeclaration } from './Declaration';

/**
 * Parameter declaration. Is contained in a method or function delaration since a parameter can not be exported
 * by itself.
 *
 * @export
 * @class ParameterDeclaration
 * @implements {TypedDeclaration}
 */
export class ParameterDeclaration implements TypedDeclaration {
    constructor(public name: string, public type: string | undefined, public start?: number, public end?: number) { }
}

export class ObjectBoundParameterDeclaration extends ParameterDeclaration {
    public parameters: ParameterDeclaration[] = [];
    public typeReference: string | undefined;

    public get name(): string {
        return `{ ${this.parameters.map(p => p.name).join(', ')} }`;
    }

    public set name(_: string) { }

    public get type(): string {
        return `{ ${this.parameters.map(p => p.type).join(', ')} }`;
    }

    public set type(_: string) { }

    constructor(start?: number, end?: number) {
        super('', '', start, end);
    }
}

export class ArrayBoundParameterDeclaration extends ParameterDeclaration {
    public parameters: ParameterDeclaration[] = [];
    public typeReference: string | undefined;

    public get name(): string {
        return `[ ${this.parameters.map(p => p.name).join(', ')} ]`;
    }

    public set name(_: string) { }

    public get type(): string {
        return `[ ${this.parameters.map(p => p.type).join(', ')} ]`;
    }

    public set type(_: string) { }

    constructor(start?: number, end?: number) {
        super('', '', start, end);
    }
}
