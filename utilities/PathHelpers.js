"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
/**
 * Returns a normalized version of the a path uri. Removes a "file://" or "file:///" prefix and removes semicolons.
 *
 * @export
 * @param {string} uri
 * @returns {string}
 */
function normalizePathUri(uri) {
    const decoded = decodeURIComponent(uri);
    if (os_1.platform() === 'win32') {
        return decoded.replace('file:///', '');
    }
    return decoded.replace('file://', '');
}
exports.normalizePathUri = normalizePathUri;
/**
 * Returns an adjusted and normalized filepath to use within the index.
 * Essentially does remove `.tsx` `.ts` `.js` `.jsx` endings and other adjustments.
 *
 * @export
 * @param {string} filepath
 * @returns {string}
 */
function normalizeFilename(filepath) {
    return toPosix(filepath.replace(/([.]d)?[.](t|j)sx?$/g, ''));
}
exports.normalizeFilename = normalizeFilename;
/**
 * On Windows, replaces all backslash delimeters with forward slashes.
 * On other OSes, returns the path unmodified.
 */
function toPosix(path) {
    if (os_1.platform() === 'win32') {
        return path.replace(/\\/g, '/');
    }
    return path;
}
exports.toPosix = toPosix;
