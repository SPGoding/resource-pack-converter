import JE16ToJE17 from './je16-je17'
import JE17ToJE16 from './je17-je16'
import { AdapterInitialization } from '../adapters/adapter'
import { Version } from '../utils'

/**
 * All avaliable adapter classes.
 */
export const CONVERSIONS: Conversion[] = [JE16ToJE17, JE17ToJE16]

/**
 * Contains a set of adapters.
 */
export interface Conversion {
    /**
     * Specifies the game version which the conversion starts from.
     */
    from: Version,
    /**
     * Specifies the game version which the conversion ends with.
     */
    to: Version,
    /**
     * Contains a set of adapter initializations.
     */
    adapters: AdapterInitialization[]
}


