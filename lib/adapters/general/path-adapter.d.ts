import Adapter from '../adapter';
import ResourceFilter from '../../utils/resource-filter';
import Logger from '../../utils/logger';
import { Resource } from '../../utils/utils';
export interface PathAdapterParams {
    /**
     * Stores all renaming operations.
     */
    operations: {
        /**
         * A file filter.
         */
        filter: ResourceFilter;
        /**
         * Specifies the new namespaced ID.
         */
        set: string;
    }[];
}
export default class PathAdapter implements Adapter {
    private readonly params;
    constructor(params: PathAdapterParams);
    execute(input: Resource, logger: Logger): Promise<Resource>;
}
