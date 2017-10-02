import { TypescriptParser } from './';

const parser = new TypescriptParser();

const code = `
class Foo {
    private _calc: string;

    public get calc(): string {
        return this._calc;
    }

    public set calc(value: string) {
        this._calc = value;
    }

    public foo(): void {

    }
}
`;

async function parse(): Promise<void> {
    // const parsed = await parser.parseSource(`import Foo, { Foobar } from 'myLib';`);
    // const parsed = await parser.parseSource(`import Foo from 'myLib';`);
    // const parsed = await parser.parseSource(`import { Foo } from 'myLib';`);
    // const parsed = await parser.parseSource(`import { Foo, default as Bar } from 'myLib';`);
    const parsed = await parser.parseSource(code);
    console.log(parsed);
}

parse().then(() => process.exit(0)).catch(() => process.exit(1));
