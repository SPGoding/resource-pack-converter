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
     * If `interpreted` exists, never read `buffer`.
     * @see interpreted
     */
    buffer: Buffer,
    /**
     * If `interpreted` exists, never read `buffer`.
     * @see buffer
     */
    interpreted?: any,
    loc: Location
}
