import { resolve } from 'path';

export function getWorkspaceFile(pathFromWorkspace: string): string {
    return resolve(__dirname, '_workspace', pathFromWorkspace);
}

export const rootPath = resolve(__dirname, '_workspace');
