import Adapter from './adapter';
import { File, Logger } from '../utils';
export interface SkinAdapterParams {
    /**
     * Specifies the files which this adapter should handle. Should be an Regular Expression.
     */
    find: string;
    /**
     * Adapt type.
     */
    type: 'singleToDouble' | 'doubleToSingle';
}
export default class SkinAdapter implements Adapter {
    private readonly params;
    constructor(params: SkinAdapterParams);
    execute(input: File, logger: Logger): Promise<File>;
}
