import { Conversion } from './conversion'
import PathAdapter from '../adapters/general/path-adapter'
import PackMcmetaAdapter from '../adapters/general/pack-mcmeta-adapter'

export const JE17ToJE16: Conversion = {
    from: 'JE1.7',
    to: 'JE1.6',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 1
        }),
        new PathAdapter({
            operations: [
                {
                    find: '^assets/minecraft/textures/items/fish_cod_cooked\\.png(\\.mcmeta)?$',
                    moveTo: 'assets/minecraft/textures/items/fish_cooked.png$1'
                },
                {
                    find: '^assets/minecraft/textures/items/fish_cod_raw\\.png(\\.mcmeta)?$',
                    moveTo: 'assets/minecraft/textures/items/fish_raw.png$1'
                }
            ]
        })
    ]
}

export default JE17ToJE16
