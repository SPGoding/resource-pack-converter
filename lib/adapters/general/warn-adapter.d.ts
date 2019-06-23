import Adapter from '../adapter';
import { Resource } from '../../utils/utils';
import Logger from '../../utils/logger';
export interface WarnAdapterParams {
    /**
     * Stores all warnings.
     */
    warnings: {
        /**
         * The warnings will be sent if specific files exist. Should be an
         * Regular Expression.
         */
        find: string | string[];
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
