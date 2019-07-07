import { Image } from 'canvas'
import Blockstate from './Blockstate'
import Model from './Model'

/**
 * Structure of the Whole.
 */
export default interface Whole {
    blockstates: {
        [nid: string]: {
            buffer: Buffer,
            value?: Blockstate,
            ext: string
        }
    },
    lang: {
        [nid: string]: {
            buffer: Buffer,
            value?: string, // TODO
            ext: string
        }
    },
    models: {
        [nid: string]: {
            buffer: Buffer,
            value?: Model,
            ext: string
        }
    },
    texts: {
        [nid: string]: {
            buffer: Buffer,
            value?: string,
            ext: string
        }
    },
    textures: {
        [nid: string]: {
            buffer: Buffer,
            value?: Image,
            ext: string
        }
    },
    '?': {
        [path: string]: {
            buffer: Buffer,
            ext: string
        }
    },
    [type: string]: {
        [nid: string]: {
            buffer: Buffer,
            value?: any,
            ext: string
        }
    }
}
