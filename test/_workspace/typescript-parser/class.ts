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
