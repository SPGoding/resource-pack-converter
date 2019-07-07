export type Location = {
    nid: string,
    type: string,
    ext: string
}

/**
 * Reprensets an resource in the resource pack.
 */
export default interface Resource {
    /**
     * If `value` exists, never read `buffer`.
     * @see interpreted
     */
    buffer: Buffer,
    /**
     * If `value` exists, never read `buffer`.
     * @see buffer
     */
    value?: any,
    loc: Location
}
