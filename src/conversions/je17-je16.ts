import { Conversion } from './conversion'
import PathAdapter from '../adapters/general/path-adapter'
import PackMcmetaAdapter from '../adapters/general/pack-mcmeta-adapter'
import ResourceFilter from '../utils/resource-filter'

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
                    filter: new ResourceFilter('textures', [/^minecraft:items\/fish_cod_cooked$/], ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_cooked'
                },
                {
                    filter: new ResourceFilter('textures', [/^minecraft:items\/fish_cod_raw$/], ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_raw'
                }
            ]
        })
    ]
}

export default JE17ToJE16
