export interface Adapter {
    constructor(params: object): void
    
    /**
     * The identity of the adapter.
     */
    id: string
    /**
     * Adapt
     */
    execute(input: File): File
}
