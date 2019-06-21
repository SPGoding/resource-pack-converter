import Adapter from './adapter';
import { File, Logger } from '../utils';
export interface PackMcmetaAdapterParams {
    /**
     * Change `pack.pack_format` to specific value.
     */
    changeFormatTo: number;
}
export default class PackMcmetaAdapter implements Adapter {
    private readonly params;
    constructor(params: PackMcmetaAdapterParams);
    execute(input: File, logger: Logger): Promise<File>;
}
