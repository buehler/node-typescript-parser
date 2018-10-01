abstract class AbstractClass {
    public method1() { }

    public abstract abstractMethod(): void;
}

class NonExportedClass {
    constructor(public param1: string) { }

    public method1(): void { }
    protected method2(): void { }
    private method3(): void {
        let variable = '';
    }
}

export class ExportedClass {
    private _property: string;
    protected protect: string;
    public pub: string;

    public get property(): string {
        return this._property;
    }

    public set property(value: string) {
        this._property = value;
    }
}

class Generic<T> { }
class MultiGeneric<TIn, TOut, TError> { }

class PropertyAccessors {
    public get getOnly(): string {
        return 'foobar';
    }

    public set setOnly(value: any) {
    }

    public get getAndSet(): string {
        return '';
    }

    public set getAndSet(value: string) {

    }
}

abstract class AbstractPropertyAccessors {
    public abstract get getOnly(): string;
    public abstract set setOnly(value: any);
    public abstract get getAndSet(): string;
    public abstract set getAndSet(value: string);
}

class ObjAndArrDestruct {
    constructor({ p1, p2 }: any, [p3, p4]: any) { }

    public objMethod({ p1, p2, p3 }: any): void { }

    public arrMethod([p1, p2, p3]: string[]): void { }

    public objAndArrMethod([p1, p2, p3]: string[], { p4, p5 }: any): void { }
}

class OptionalProperties {
    public nonOptional: string;
    public nonOptionalAsWell: string | undefined;
    public optional?: string;
}

class StaticThings {
    public static prop: string;
    public static method(): void { }
    public methodNonStatic(): void { }
}
