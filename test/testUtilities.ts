import * as Path from 'path';

import { toPosix } from '../src/utilities/PathHelpers';

export function getWorkspaceFile(pathFromWorkspace: string): string {
    return resolve(__dirname, '_workspace', pathFromWorkspace);
}

// Like path.resolve, but always replaces backslashes with forward slashes on Windows.
export function resolve(...paths: string[]): string {
    return toPosix(Path.resolve(...paths));
}

// Like path.join, but always replaces backslashes with forward slashes on Windows.
export function join(...paths: string[]): string {
    return toPosix(Path.join(...paths));
}

export const rootPath = resolve(__dirname, '_workspace');
