import Adapter from '../adapters/adapter'
import { Version } from '../utils/utils'
import JE16ToJE17 from './je16-je17'
import JE17ToJE16 from './je17-je16'
import JE17ToJE18 from './je17-je18'
import JE18ToJE17 from './je18-je17'
import JE18ToJE19 from './je18-je19'

/**
 * All avaliable adapter classes.
 */
export const CONVERSIONS: Conversion[] = [JE16ToJE17, JE17ToJE16, JE17ToJE18, JE18ToJE17, JE18ToJE19]

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
     * Contains a set of adapters.
     */
    adapters: Adapter[]
}
