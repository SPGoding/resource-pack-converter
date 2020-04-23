export type Location = {
    nid: string,
    type: string,
    ext: string
}

/**
 * Reprensets an resource in the resource pack.
 */
export default interface Resource {
    value?: any,
    loc: Location
}
