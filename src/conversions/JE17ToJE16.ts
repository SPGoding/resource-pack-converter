import Conversion from './Conversion'
import PathAdapter from '../adapters/general/PathAdapter'
import PackMcmetaAdapter from '../adapters/general/PackMcmetaAdapter'
import ResourceFilter from '../utils/ResourceFilter'

export default {
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
} as Conversion
