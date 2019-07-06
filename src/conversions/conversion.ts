import Adapter from '../adapters/Adapter'
import Whole from '../utils/Whole'
import JE16ToJE17 from './JE16ToJE17'
import JE17ToJE16 from './JE17ToJE16'
import JE17ToJE18 from './JE17ToJE18'
import JE18ToJE17 from './JE18ToJE17'
import JE18ToJE19 from './JE18ToJE19'
import { Version } from '../utils/utils'

/**
 * All avaliable adapter classes.
 */
export const CONVERSIONS: Conversion[] = [JE16ToJE17, JE17ToJE16, JE17ToJE18, JE18ToJE17, JE18ToJE19]

/**
 * Contains a set of adapters.
 */
export default interface Conversion {
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
    adapters: (Adapter | ((whole: Whole) => Adapter))[],
    /**
     * Contains a set of adapter factories.
     */
    // adapterFactories: AdapterFactory[]
}
