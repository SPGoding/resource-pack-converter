import Conversion from './Conversion'
import WarnAdapter from '../adapters/general/WarnAdapter'
import PackMcmetaAdapter from '../adapters/general/PackMcmetaAdapter'
import SkinAdapter from '../adapters/je17-je18/SkinAdapter'
import ResourceFilter from '../utils/ResourceFilter'

export default {
    from: 'JE1.7',
    to: 'JE1.8',
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
                    find: [
                        /^assets\/minecraft\/textures\/gui\/container\/enchanting_table\.png$/,
                        /^assets\/minecraft\/textures\/gui\/widgets\.png$/
                    ],
                    send: [
                        'You may want to add new textures.'
                    ]
                },
                {
                    find: [
                        /^assets\/minecraft\/textures\/blocks\/leaves_acacia_opaque\.png$/,
                        /^assets\/minecraft\/textures\/blocks\/leaves_big_oak_opaque\.png$/,
                        /^assets\/minecraft\/textures\/blocks\/leaves_birch_opaque\.png$/,
                        /^assets\/minecraft\/textures\/blocks\/leaves_jungle_opaque\.png$/,
                        /^assets\/minecraft\/textures\/blocks\/leaves_oak_opaque\.png$/,
                        /^assets\/minecraft\/textures\/blocks\/leaves_spruce_opaque\.png$/,
                        /^assets\/minecraft\/textures\/items\/skull_creeper\.png$/,
                        /^assets\/minecraft\/textures\/items\/skull_skeleton\.png$/,
                        /^assets\/minecraft\/textures\/items\/skull_steve\.png$/,
                        /^assets\/minecraft\/textures\/items\/skull_wither\.png$/,
                        /^assets\/minecraft\/textures\/items\/skull_zombie\.png$/
                    ],
                    send: [
                        'This file may not work as intended.',
                    ]
                },
                {
                    find: /^pack\.mcmeta$/,
                    send: [
                        'You may want to add following resources:',
                        "'textures | png | minecraft:blocks/coarse_dirt'",
                        "'textures | png | minecraft:blocks/daylight_detector_inverted_top'",
                        "'textures | png | minecraft:blocks/door_acacia_lower'",
                        "'textures | png | minecraft:blocks/door_acacia_upper'",
                        "'textures | png | minecraft:blocks/door_birch_lower'",
                        "'textures | png | minecraft:blocks/door_birch_upper'",
                        "'textures | png | minecraft:blocks/door_dark_oak_lower'",
                        "'textures | png | minecraft:blocks/door_dark_oak_upper'",
                        "'textures | png | minecraft:blocks/door_jungle_lower'",
                        "'textures | png | minecraft:blocks/door_jungle_upper'",
                        "'textures | png | minecraft:blocks/door_spruce_lower'",
                        "'textures | png | minecraft:blocks/door_spruce_upper'",
                        "'textures | png | minecraft:blocks/iron_trapdoor'",
                        "'textures | png | minecraft:blocks/prismarine_bricks'",
                        "'textures | png | minecraft:blocks/prismarine_dark'",
                        "'textures | png | minecraft:blocks/prismarine_rough'",
                        "'textures | png | minecraft:blocks/prismarine_rough.mcmeta'",
                        "'textures | png | minecraft:blocks/red_sandstone_bottom'",
                        "'textures | png | minecraft:blocks/red_sandstone_carved'",
                        "'textures | png | minecraft:blocks/red_sandstone_normal'",
                        "'textures | png | minecraft:blocks/red_sandstone_smooth'",
                        "'textures | png | minecraft:blocks/red_sandstone_top'",
                        "'textures | png | minecraft:blocks/sea_lantern'",
                        "'textures | png | minecraft:blocks/sea_lantern.mcmeta'",
                        "'textures | png | minecraft:blocks/slime'",
                        "'textures | png | minecraft:blocks/sponge_wet'",
                        "'textures | png | minecraft:blocks/stone_andesite'",
                        "'textures | png | minecraft:blocks/stone_andesite_smooth'",
                        "'textures | png | minecraft:blocks/stone_diorite'",
                        "'textures | png | minecraft:blocks/stone_diorite_smooth'",
                        "'textures | png | minecraft:blocks/stone_granite'",
                        "'textures | png | minecraft:blocks/stone_granite_smooth'",
                        "'textures | png | minecraft:effect/dither'",
                        "'textures | png | minecraft:entity/alex'",
                        "'textures | png | minecraft:entity/armorstand/wood'",
                        "'textures | png | minecraft:entity/banner/base'",
                        "'textures | png | minecraft:entity/banner/border'",
                        "'textures | png | minecraft:entity/banner/bricks'",
                        "'textures | png | minecraft:entity/banner/circle'",
                        "'textures | png | minecraft:entity/banner/creeper'",
                        "'textures | png | minecraft:entity/banner/cross'",
                        "'textures | png | minecraft:entity/banner/curly_border'",
                        "'textures | png | minecraft:entity/banner/diagonal_left'",
                        "'textures | png | minecraft:entity/banner/diagonal_right'",
                        "'textures | png | minecraft:entity/banner/diagonal_up_left'",
                        "'textures | png | minecraft:entity/banner/diagonal_up_right'",
                        "'textures | png | minecraft:entity/banner/flower'",
                        "'textures | png | minecraft:entity/banner/gradient'",
                        "'textures | png | minecraft:entity/banner/gradient_up'",
                        "'textures | png | minecraft:entity/banner/half_horizontal'",
                        "'textures | png | minecraft:entity/banner/half_horizontal_bottom'",
                        "'textures | png | minecraft:entity/banner/half_vertical'",
                        "'textures | png | minecraft:entity/banner/half_vertical_right'",
                        "'textures | png | minecraft:entity/banner/mojang'",
                        "'textures | png | minecraft:entity/banner/rhombus'",
                        "'textures | png | minecraft:entity/banner/skull'",
                        "'textures | png | minecraft:entity/banner/small_stripes'",
                        "'textures | png | minecraft:entity/banner/square_bottom_left'",
                        "'textures | png | minecraft:entity/banner/square_bottom_right'",
                        "'textures | png | minecraft:entity/banner/square_top_left'",
                        "'textures | png | minecraft:entity/banner/square_top_right'",
                        "'textures | png | minecraft:entity/banner/straight_cross'",
                        "'textures | png | minecraft:entity/banner/stripe_bottom'",
                        "'textures | png | minecraft:entity/banner/stripe_center'",
                        "'textures | png | minecraft:entity/banner/stripe_downleft'",
                        "'textures | png | minecraft:entity/banner/stripe_downright'",
                        "'textures | png | minecraft:entity/banner/stripe_left'",
                        "'textures | png | minecraft:entity/banner/stripe_middle'",
                        "'textures | png | minecraft:entity/banner/stripe_right'",
                        "'textures | png | minecraft:entity/banner/stripe_top'",
                        "'textures | png | minecraft:entity/banner/triangles_bottom'",
                        "'textures | png | minecraft:entity/banner/triangles_top'",
                        "'textures | png | minecraft:entity/banner/triangle_bottom'",
                        "'textures | png | minecraft:entity/banner/triangle_top'",
                        "'textures | png | minecraft:entity/banner_base'",
                        "'textures | png | minecraft:entity/endermite'",
                        "'textures | png | minecraft:entity/guardian'",
                        "'textures | png | minecraft:entity/guardian_beam'",
                        "'textures | png | minecraft:entity/guardian_elder'",
                        "'textures | png | minecraft:entity/rabbit/black'",
                        "'textures | png | minecraft:entity/rabbit/brown'",
                        "'textures | png | minecraft:entity/rabbit/caerbannog'",
                        "'textures | png | minecraft:entity/rabbit/gold'",
                        "'textures | png | minecraft:entity/rabbit/salt'",
                        "'textures | png | minecraft:entity/rabbit/toast'",
                        "'textures | png | minecraft:entity/rabbit/white'",
                        "'textures | png | minecraft:entity/rabbit/white_splotched'",
                        "'textures | png | minecraft:gui/presets/chaos'",
                        "'textures | png | minecraft:gui/presets/delight'",
                        "'textures | png | minecraft:gui/presets/drought'",
                        "'textures | png | minecraft:gui/presets/isles'",
                        "'textures | png | minecraft:gui/presets/luck'",
                        "'textures | png | minecraft:gui/presets/madness'",
                        "'textures | png | minecraft:gui/presets/water'",
                        "'textures | png | minecraft:gui/server_selection'",
                        "'textures | png | minecraft:gui/spectator_widgets'",
                        "'textures | png | minecraft:gui/stream_indicator'",
                        "'textures | png | minecraft:items/banner_base'",
                        "'textures | png | minecraft:items/banner_overlay'",
                        "'textures | png | minecraft:items/barrier'",
                        "'textures | png | minecraft:items/door_acacia'",
                        "'textures | png | minecraft:items/door_birch'",
                        "'textures | png | minecraft:items/door_dark_oak'",
                        "'textures | png | minecraft:items/door_jungle'",
                        "'textures | png | minecraft:items/door_spruce'",
                        "'textures | png | minecraft:items/mutton_cooked'",
                        "'textures | png | minecraft:items/mutton_raw'",
                        "'textures | png | minecraft:items/prismarine_crystals'",
                        "'textures | png | minecraft:items/prismarine_shard'",
                        "'textures | png | minecraft:items/rabbit_cooked'",
                        "'textures | png | minecraft:items/rabbit_foot'",
                        "'textures | png | minecraft:items/rabbit_hide'",
                        "'textures | png | minecraft:items/rabbit_raw'",
                        "'textures | png | minecraft:items/rabbit_stew'",
                        "'textures | png | minecraft:items/wooden_armorstand'",
                        "'textures | png | minecraft:misc/forcefield'",
                        "'textures | png | minecraft:misc/unknown_server'"
                    ]
                }
            ]
        }),
        new SkinAdapter({
            filter: new ResourceFilter('textures', 'minecraft:entity/steve', ['png'])
        })
    ]
} as Conversion
