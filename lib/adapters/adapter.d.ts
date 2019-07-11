import Resource from '../utils/Resource';
import Logger from '../utils/Logger';
/**
 * Represents an adapter. Adapters carry out operations for single file in the resource pack,
 * e.g. renaming, scaling image, changing text content, etc.
 */
export default interface Adapter {
    params: any;
    /**
     * Adapts.
     */
    execute(input: Resource, logger: Logger): Promise<Resource | Resource[]>;
}
