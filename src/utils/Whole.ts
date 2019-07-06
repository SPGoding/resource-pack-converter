import { Blockstates } from './Blockstates'
import { Model } from './Model'
/**
 * Structure of the Whole.
 */
export interface Whole {
    blockstates: {
        [nid: string]: Blockstates;
    }
    models: {
        [nid: string]: Model;
    }
}
