import Adapter from './adapter';
import { File, Logger } from '../utils';
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
export declare class WarnAdapter implements Adapter {
    private readonly params;
    constructor(params: WarnAdapterParams);
    execute(input: File, logger: Logger): Promise<File>;
}
