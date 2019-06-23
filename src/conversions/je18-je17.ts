import { Conversion } from './conversion'
import PackMcmetaAdapter from '../adapters/general/pack-mcmeta-adapter'
import SkinAdapter from '../adapters/je18-je17/skin-adapter'

export const JE18ToJE17: Conversion = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 1
        }),
        new SkinAdapter({
            find: /^assets\/minecraft\/textures\/entity\/steve\.png$/
        })
    ]
}

export default JE18ToJE17
