import { TypescriptParser } from './';

const parser = new TypescriptParser();

const code = `
foobar[blub];
`;

async function parse(): Promise<void> {
    const parsed = await parser.parseSource(code);
    console.log(parsed);
}

parse().then(() => process.exit(0)).catch(() => process.exit(1));
