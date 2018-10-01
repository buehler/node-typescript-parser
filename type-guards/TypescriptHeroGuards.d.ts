import { CallableDeclaration, ExportableDeclaration } from '../declarations/Declaration';
import { AliasedImport } from '../imports/Import';
/**
 * Determines if the given object is a CallableDeclaration.
 *
 * @export
 * @param {*} obj
 * @returns {obj is CallableDeclaration}
 */
export declare function isCallableDeclaration(obj: any): obj is CallableDeclaration;
/**
 * Determines if the given object is an ExportableDeclaration.
 *
 * @export
 * @param {*} obj
 * @returns {obj is ExportableDeclaration}
 */
export declare function isExportableDeclaration(obj: any): obj is ExportableDeclaration;
/**
 * Determines if the given object is an AliasedImport.
 *
 * @export
 * @param {*} obj
 * @returns {obj is AliasedImport}
 */
export declare function isAliasedImport(obj: any): obj is AliasedImport;
