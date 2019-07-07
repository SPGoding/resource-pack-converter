/**
 * Reprensets an resource in the resource pack.
 */
export default interface Resource {
    buffer: Buffer,
    interpreted?: any,
    location: {
        nid: string,
        type: string,
        extension: string
    }
}
