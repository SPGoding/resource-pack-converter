import Adapter from '../adapter';
import { Resource } from '../../utils/Resource';
import Logger from '../../utils/logger';
export interface PackMcmetaAdapterParams {
    /**
     * Change `pack.pack_format` to specific value.
     */
    changeFormatTo: number;
}
export default class PackMcmetaAdapter implements Adapter {
    private readonly params;
    constructor(params: PackMcmetaAdapterParams);
    execute(input: Resource, logger: Logger): Promise<Resource>;
}
