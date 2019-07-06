import Adapter from '../adapters/Adapter';
import { Version } from '../utils/utils';
import { Whole } from '../utils/Whole';
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
    adapters: (Adapter | ((whole: Whole) => Adapter))[];
}
