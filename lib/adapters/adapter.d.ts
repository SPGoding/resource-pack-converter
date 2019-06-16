import { File, Logger } from '../utils';
import { PathAdapterParams } from './path-adapter';
import { WarnAdapterParams } from './warn-adapter';
import { SkinAdapterParams } from './skin-adapter';
/**
 * All avaliable adapter classes.
 */
export declare const ADAPTERS: any[];
/**
 * Represents an adapter. Adapters carry out operations for single file in the resource pack,
 * e.g. renaming, scaling image, changing text content, etc.
 */
export default interface Adapter {
    constructor: Function;
    /**
     * Adapts.
     */
    execute(input: File, logger: Logger): File;
}
/**
 * An initialization of adapter.
 */
export interface AdapterInitialization {
    /**
     * The identity of adapter.
     */
    id: string;
    /**
     * Stores all parameters used to initialize the adapter.
     */
    params: PathAdapterParams | SkinAdapterParams | WarnAdapterParams;
}
