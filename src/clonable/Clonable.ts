/**
 * Interface for clonable objects. The clone() method creates a deep clone of the object.
 * 
 * @export
 * @template T
 * @interface Clonable
 */
export interface Clonable<T> {
    /**
     * Create a deep clone of this object.
     * 
     * @returns {T}
     * 
     * @memberof Clonable
     */
    clone(): T;
}
