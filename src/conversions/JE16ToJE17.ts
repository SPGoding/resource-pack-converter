import Conversion from './Conversion'
import WarnAdapter from '../adapters/general/WarnAdapter'
import PathAdapter from '../adapters/general/PathAdapter'
import PackMcmetaAdapter from '../adapters/general/PackMcmetaAdapter'
import ResourceFilter from '../utils/ResourceFilter'

export default {
    from: 'JE1.6',
    to: 'JE1.7',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 1
        }),
        new WarnAdapter({
            warnings: [
                {
                    find: /^assets\/minecraft\/lang\/\w+\.lang$/,
                    send: [
                        'You may want to update translations.'
                    ]
                },
                {
                    find: /^pack\.mcmeta$/,
                    send: [
                        'You may want to add following files:',
                        "'minecraft:blocks/dirt_podzol_side'",
                        "'minecraft:blocks/dirt_podzol_top'",
                        "'minecraft:blocks/double_plant_fern_bottom'",
                        "'minecraft:blocks/double_plant_fern_top'",
                        "'minecraft:blocks/double_plant_grass_bottom'",
                        "'minecraft:blocks/double_plant_grass_top'",
                        "'minecraft:blocks/double_plant_paeonia_bottom'",
                        "'minecraft:blocks/double_plant_paeonia_top'",
                        "'minecraft:blocks/double_plant_rose_bottom'",
                        "'minecraft:blocks/double_plant_rose_top'",
                        "'minecraft:blocks/double_plant_sunflower_back'",
                        "'minecraft:blocks/double_plant_sunflower_bottom'",
                        "'minecraft:blocks/double_plant_sunflower_front'",
                        "'minecraft:blocks/double_plant_sunflower_top'",
                        "'minecraft:blocks/double_plant_syringa_bottom'",
                        "'minecraft:blocks/double_plant_syringa_top'",
                        "'minecraft:blocks/flower_allium'",
                        "'minecraft:blocks/flower_blue_orchid'",
                        "'minecraft:blocks/flower_houstonia'",
                        "'minecraft:blocks/flower_oxeye_daisy'",
                        "'minecraft:blocks/flower_paeonia'",
                        "'minecraft:blocks/flower_tulip_orange'",
                        "'minecraft:blocks/flower_tulip_pink'",
                        "'minecraft:blocks/flower_tulip_red'",
                        "'minecraft:blocks/flower_tulip_white'",
                        "'minecraft:blocks/glass_black'",
                        "'minecraft:blocks/glass_blue'",
                        "'minecraft:blocks/glass_brown'",
                        "'minecraft:blocks/glass_cyan'",
                        "'minecraft:blocks/glass_gray'",
                        "'minecraft:blocks/glass_green'",
                        "'minecraft:blocks/glass_light_blue'",
                        "'minecraft:blocks/glass_lime'",
                        "'minecraft:blocks/glass_magenta'",
                        "'minecraft:blocks/glass_orange'",
                        "'minecraft:blocks/glass_pane_top_black'",
                        "'minecraft:blocks/glass_pane_top_blue'",
                        "'minecraft:blocks/glass_pane_top_brown'",
                        "'minecraft:blocks/glass_pane_top_cyan'",
                        "'minecraft:blocks/glass_pane_top_gray'",
                        "'minecraft:blocks/glass_pane_top_green'",
                        "'minecraft:blocks/glass_pane_top_light_blue'",
                        "'minecraft:blocks/glass_pane_top_lime'",
                        "'minecraft:blocks/glass_pane_top_magenta'",
                        "'minecraft:blocks/glass_pane_top_orange'",
                        "'minecraft:blocks/glass_pane_top_pink'",
                        "'minecraft:blocks/glass_pane_top_purple'",
                        "'minecraft:blocks/glass_pane_top_red'",
                        "'minecraft:blocks/glass_pane_top_silver'",
                        "'minecraft:blocks/glass_pane_top_white'",
                        "'minecraft:blocks/glass_pane_top_yellow'",
                        "'minecraft:blocks/glass_pink'",
                        "'minecraft:blocks/glass_purple'",
                        "'minecraft:blocks/glass_red'",
                        "'minecraft:blocks/glass_silver'",
                        "'minecraft:blocks/glass_white'",
                        "'minecraft:blocks/glass_yellow'",
                        "'minecraft:blocks/ice_packed'",
                        "'minecraft:blocks/leaves_acacia'",
                        "'minecraft:blocks/leaves_acacia_opaque'",
                        "'minecraft:blocks/leaves_big_oak'",
                        "'minecraft:blocks/leaves_big_oak_opaque'",
                        "'minecraft:blocks/log_acacia'",
                        "'minecraft:blocks/log_acacia_top'",
                        "'minecraft:blocks/log_big_oak'",
                        "'minecraft:blocks/log_big_oak_top'",
                        "'minecraft:blocks/planks_acacia'",
                        "'minecraft:blocks/planks_big_oak'",
                        "'minecraft:blocks/red_sand'",
                        "'minecraft:blocks/sapling_acacia'",
                        "'minecraft:blocks/sapling_roofed_oak'",
                        "'minecraft:gui/resource_packs'",
                        "'minecraft:items/fish_clownfish_raw'",
                        "'minecraft:items/fish_pufferfish_raw'",
                        "'minecraft:items/fish_salmon_cooked'",
                        "'minecraft:items/fish_salmon_raw'",
                        "'minecraft:items/minecart_command_block'"
                    ]
                }
            ]
        }),
        new PathAdapter({
            operations: [
                {
                    filter: new ResourceFilter('textures', [/^minecraft:items\/fish_cooked$/], ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_cod_cooked'
                },
                {
                    filter: new ResourceFilter('textures', [/^minecraft:items\/fish_raw$/], ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_cod_raw'
                }
            ]
        })
    ]
} as Conversion
