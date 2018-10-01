/**
 * Returns a normalized version of the a path uri. Removes a "file://" or "file:///" prefix and removes semicolons.
 *
 * @export
 * @param {string} uri
 * @returns {string}
 */
export declare function normalizePathUri(uri: string): string;
/**
 * Returns an adjusted and normalized filepath to use within the index.
 * Essentially does remove `.tsx` `.ts` `.js` `.jsx` endings and other adjustments.
 *
 * @export
 * @param {string} filepath
 * @returns {string}
 */
export declare function normalizeFilename(filepath: string): string;
/**
 * On Windows, replaces all backslash delimeters with forward slashes.
 * On other OSes, returns the path unmodified.
 */
export declare function toPosix(path: string): string;
