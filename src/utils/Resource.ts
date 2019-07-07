/**
 * Reprensets an resource in the resource pack.
 */
export default interface Resource {
    /**
     * The content of the resource.
     */
    content: Buffer
    /**
     * The relative path navigated from the root of a resource pack.
     */
    path: string
}
