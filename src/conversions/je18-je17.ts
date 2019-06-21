import { Conversion } from './conversion'
import SkinAdapter from '../adapters/skin-adapter'
import PackMcmetaAdapter from '../adapters/pack-mcmeta-adapter'

export const JE18ToJE17: Conversion = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 1
        }),
        new SkinAdapter({
            find: '^assets/minecraft/textures/entity/steve\\.png$',
            type: 'doubleToSingle'
        })
    ]
}

export default JE18ToJE17
