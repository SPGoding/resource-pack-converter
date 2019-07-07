import Adapter from '../adapters/Adapter';
import Whole from '../utils/Whole';
import { Version } from '../utils/utils';
/**
 * All avaliable adapter classes.
 */
export declare const Convertions: Conversion[];
/**
 * Contains a set of adapters.
 */
export default interface Conversion {
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
    adapters: (Adapter | ((whole: Whole) => (Adapter | Adapter[])))[];
}
