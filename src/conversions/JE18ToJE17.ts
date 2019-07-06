import { Conversion } from './Conversion'
import PackMcmetaAdapter from '../adapters/general/PackMcmetaAdapter'
import SkinAdapter from '../adapters/je18-je17/SkinAdapter'

export default {
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
} as Conversion
