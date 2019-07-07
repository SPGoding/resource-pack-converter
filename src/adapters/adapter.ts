import Resource from '../utils/Resource'
import Logger from '../utils/Logger'

/**
 * Represents an adapter. Adapters carry out operations for single file in the resource pack, 
 * e.g. renaming, scaling image, changing text content, etc.
 */
export default abstract class Adapter {
    /**
     * Adapts.
     */
    abstract execute(input: Resource, logger: Logger): Promise<Resource | Resource[]>
}
