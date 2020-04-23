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
                        'You may want to add following resources:',
                        "'textures | png | minecraft:blocks/dirt_podzol_side'",
                        "'textures | png | minecraft:blocks/dirt_podzol_top'",
                        "'textures | png | minecraft:blocks/double_plant_fern_bottom'",
                        "'textures | png | minecraft:blocks/double_plant_fern_top'",
                        "'textures | png | minecraft:blocks/double_plant_grass_bottom'",
                        "'textures | png | minecraft:blocks/double_plant_grass_top'",
                        "'textures | png | minecraft:blocks/double_plant_paeonia_bottom'",
                        "'textures | png | minecraft:blocks/double_plant_paeonia_top'",
                        "'textures | png | minecraft:blocks/double_plant_rose_bottom'",
                        "'textures | png | minecraft:blocks/double_plant_rose_top'",
                        "'textures | png | minecraft:blocks/double_plant_sunflower_back'",
                        "'textures | png | minecraft:blocks/double_plant_sunflower_bottom'",
                        "'textures | png | minecraft:blocks/double_plant_sunflower_front'",
                        "'textures | png | minecraft:blocks/double_plant_sunflower_top'",
                        "'textures | png | minecraft:blocks/double_plant_syringa_bottom'",
                        "'textures | png | minecraft:blocks/double_plant_syringa_top'",
                        "'textures | png | minecraft:blocks/flower_allium'",
                        "'textures | png | minecraft:blocks/flower_blue_orchid'",
                        "'textures | png | minecraft:blocks/flower_houstonia'",
                        "'textures | png | minecraft:blocks/flower_oxeye_daisy'",
                        "'textures | png | minecraft:blocks/flower_paeonia'",
                        "'textures | png | minecraft:blocks/flower_tulip_orange'",
                        "'textures | png | minecraft:blocks/flower_tulip_pink'",
                        "'textures | png | minecraft:blocks/flower_tulip_red'",
                        "'textures | png | minecraft:blocks/flower_tulip_white'",
                        "'textures | png | minecraft:blocks/glass_black'",
                        "'textures | png | minecraft:blocks/glass_blue'",
                        "'textures | png | minecraft:blocks/glass_brown'",
                        "'textures | png | minecraft:blocks/glass_cyan'",
                        "'textures | png | minecraft:blocks/glass_gray'",
                        "'textures | png | minecraft:blocks/glass_green'",
                        "'textures | png | minecraft:blocks/glass_light_blue'",
                        "'textures | png | minecraft:blocks/glass_lime'",
                        "'textures | png | minecraft:blocks/glass_magenta'",
                        "'textures | png | minecraft:blocks/glass_orange'",
                        "'textures | png | minecraft:blocks/glass_pane_top_black'",
                        "'textures | png | minecraft:blocks/glass_pane_top_blue'",
                        "'textures | png | minecraft:blocks/glass_pane_top_brown'",
                        "'textures | png | minecraft:blocks/glass_pane_top_cyan'",
                        "'textures | png | minecraft:blocks/glass_pane_top_gray'",
                        "'textures | png | minecraft:blocks/glass_pane_top_green'",
                        "'textures | png | minecraft:blocks/glass_pane_top_light_blue'",
                        "'textures | png | minecraft:blocks/glass_pane_top_lime'",
                        "'textures | png | minecraft:blocks/glass_pane_top_magenta'",
                        "'textures | png | minecraft:blocks/glass_pane_top_orange'",
                        "'textures | png | minecraft:blocks/glass_pane_top_pink'",
                        "'textures | png | minecraft:blocks/glass_pane_top_purple'",
                        "'textures | png | minecraft:blocks/glass_pane_top_red'",
                        "'textures | png | minecraft:blocks/glass_pane_top_silver'",
                        "'textures | png | minecraft:blocks/glass_pane_top_white'",
                        "'textures | png | minecraft:blocks/glass_pane_top_yellow'",
                        "'textures | png | minecraft:blocks/glass_pink'",
                        "'textures | png | minecraft:blocks/glass_purple'",
                        "'textures | png | minecraft:blocks/glass_red'",
                        "'textures | png | minecraft:blocks/glass_silver'",
                        "'textures | png | minecraft:blocks/glass_white'",
                        "'textures | png | minecraft:blocks/glass_yellow'",
                        "'textures | png | minecraft:blocks/ice_packed'",
                        "'textures | png | minecraft:blocks/leaves_acacia'",
                        "'textures | png | minecraft:blocks/leaves_acacia_opaque'",
                        "'textures | png | minecraft:blocks/leaves_big_oak'",
                        "'textures | png | minecraft:blocks/leaves_big_oak_opaque'",
                        "'textures | png | minecraft:blocks/log_acacia'",
                        "'textures | png | minecraft:blocks/log_acacia_top'",
                        "'textures | png | minecraft:blocks/log_big_oak'",
                        "'textures | png | minecraft:blocks/log_big_oak_top'",
                        "'textures | png | minecraft:blocks/planks_acacia'",
                        "'textures | png | minecraft:blocks/planks_big_oak'",
                        "'textures | png | minecraft:blocks/red_sand'",
                        "'textures | png | minecraft:blocks/sapling_acacia'",
                        "'textures | png | minecraft:blocks/sapling_roofed_oak'",
                        "'textures | png | minecraft:gui/resource_packs'",
                        "'textures | png | minecraft:items/fish_clownfish_raw'",
                        "'textures | png | minecraft:items/fish_pufferfish_raw'",
                        "'textures | png | minecraft:items/fish_salmon_cooked'",
                        "'textures | png | minecraft:items/fish_salmon_raw'",
                        "'textures | png | minecraft:items/minecart_command_block'"
                    ]
                }
            ]
        }),
        new PathAdapter({
            operations: [
                {
                    filter: new ResourceFilter('textures', 'minecraft:items/fish_cooked', ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_cod_cooked'
                },
                {
                    filter: new ResourceFilter('textures', 'minecraft:items/fish_raw', ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_cod_raw'
                }
            ]
        })
    ]
} as Conversion
