import Adapter from '../adapter';
import { Resource } from '../../utils/Resource';
import Logger from '../../utils/logger';
import ResourceFilter from '../../utils/resource-filter';
export interface WarnAdapterParams {
    /**
     * Stores all warnings.
     */
    warnings: {
        /**
         * The warnings will be sent if specific files exist. Should be an
         * Regular Expression.
         */
        find?: RegExp | RegExp[];
        /**
         * The warnings will be sent if the filter passes.
         */
        filter?: ResourceFilter;
        /**
         * Array of strings.
         */
        send: string[];
    }[];
}
export default class WarnAdapter implements Adapter {
    private readonly params;
    constructor(params: WarnAdapterParams);
    execute(input: Resource, logger: Logger): Promise<Resource>;
}
