import Adapter from '../adapter';
import { Resource } from '../../utils/utils';
import Logger from '../../utils/logger';
export interface SkinAdapterParams {
    /**
     * Specifies the files which this adapter should handle. Should be an Regular Expression.
     */
    find: string;
}
export default class SkinAdapter implements Adapter {
    private readonly params;
    constructor(params: SkinAdapterParams);
    execute(input: Resource, logger: Logger): Promise<Resource>;
}
