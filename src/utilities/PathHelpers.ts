import { platform } from 'os';

/**
 * Returns a normalized version of the a path uri. Removes a "file://" or "file:///" prefix and removes semicolons.
 * 
 * @export
 * @param {string} uri 
 * @returns {string} 
 */
export function normalizePathUri(uri: string): string {
    const decoded = decodeURIComponent(uri);

    if (platform() === 'win32') {
        return decoded.replace('file:///', '');
    }
    return decoded.replace('file://', '');
}

/**
 * Returns an adjusted and normalized filepath to use within the index.
 * Essentially does remove `.tsx` `.ts` `.js` `.jsx` endings and other adjustments.
 * 
 * @export
 * @param {string} filepath 
 * @returns {string} 
 */
export function normalizeFilename(filepath: string): string {
    return toPosix(filepath.replace(/([.]d)?[.](t|j)sx?$/g, ''));
}

/**
 * On Windows, replaces all backslash delimeters with forward slashes.
 * On other OSes, returns the path unmodified.
 */
export function toPosix(path: string): string {
    if (platform() === 'win32') {
        return path.replace(/\\/g, '/');
    }
    return path;
}
