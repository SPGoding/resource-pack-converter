import { Resource } from '../utils/utils'
import Logger from '../utils/logger'

/**
 * Represents an adapter. Adapters carry out operations for single file in the resource pack, 
 * e.g. renaming, scaling image, changing text content, etc.
 */
export default interface Adapter {
    constructor: Function

    /**
     * Adapts.
     */
    execute(input: Resource, logger: Logger): Promise<Resource>
}
