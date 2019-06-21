import Adapter from '../adapters/adapter';
import { Version } from '../utils';
/**
 * All avaliable adapter classes.
 */
export declare const CONVERSIONS: Conversion[];
/**
 * Contains a set of adapters.
 */
export interface Conversion {
    /**
     * Specifies the game version which the conversion starts from.
     */
    from: Version;
    /**
     * Specifies the game version which the conversion ends with.
     */
    to: Version;
    /**
     * Contains a set of adapters.
     */
    adapters: Adapter[];
}
