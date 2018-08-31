class Class1 {
    public static async staticAsync() { }
    public func(): void { }
    public async asyncFunc(): Promise<void> { }
    public async asyncFuncWithoutType() { }
}

function func(): void { }
async function asyncFunc(): Promise<void> { }
async function asyncFuncWithoutType() { }
function promiseFunc(): Promise<void> { }
