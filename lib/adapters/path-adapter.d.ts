import Adapter from './adapter';
import { File, Logger } from '../utils';
export interface PathAdapterParams {
    /**
     * Stores all renaming operations.
     */
    operations: {
        /**
         * Specifies the files which this operation should handle. Should be an Regular Expression.
         */
        find: string | string[];
        /**
         * Specifies the new path.
         */
        moveTo: string;
    }[];
}
export default class PathAdapter implements Adapter {
    private readonly params;
    constructor(params: PathAdapterParams);
    execute(input: File, logger: Logger): Promise<File>;
}
