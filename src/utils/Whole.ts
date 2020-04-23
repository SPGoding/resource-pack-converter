import Blockstate from './Blockstate'
import Model from './Model'
import { Image } from 'canvas'

/**
 * Structure of the Whole.
 */
export default interface Whole {
    blockstates: {
        json: {
            [nid: string]: Buffer | Blockstate | undefined
        },
        [ext: string]: {
            [nid: string]: any
        }
    },
    lang: {
        [ext: string]: {
            [nid: string]: Buffer | string | undefined // TODO
        }
    },
    models: {
        json: {
            [nid: string]: Buffer | Model | undefined
        },
        [ext: string]: {
            [nid: string]: any
        }
    },
    textures: {
        png: {
            [nid: string]: Buffer | Image | undefined
        },
        'png.mcmeta': {
            [nid: string]: Buffer | string | undefined // TODO
        },
        [ext: string]: {
            [nid: string]: any
        }
    },
    [type: string]: {
        [ext: string]: {
            [nid: string]: Buffer | string | Blockstate | Model | Image | undefined
        }
    }
}
