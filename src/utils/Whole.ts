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
            interpreted?: Blockstate,
            extension: string
        }
    },
    lang: {
        [nid: string]: {
            buffer: Buffer,
            interpreted?: string, // TODO
            extension: string
        }
    },
    models: {
        [nid: string]: {
            buffer: Buffer,
            interpreted?: Model,
            extension: string
        }
    },
    texts: {
        [nid: string]: {
            buffer: Buffer,
            interpreted?: string,
            extension: string
        }
    },
    textures: {
        [nid: string]: {
            buffer: Buffer,
            interpreted?: Image,
            extension: string
        }
    },
    '?': {
        [path: string]: {
            buffer: Buffer,
            extension: string
        }
    },
    [type: string]: {
        [nid: string]: {
            buffer: Buffer,
            interpreted?: any,
            extension: string
        }
    }
}
