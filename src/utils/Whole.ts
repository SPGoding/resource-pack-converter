import Blockstate from './Blockstate'
import Model from './Model'
/**
 * Structure of the Whole.
 */
export default interface Whole {
    blockstates: {
        [nid: string]: Blockstate
    }
    models: {
        [nid: string]: Model
    }
}
