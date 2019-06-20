import { Conversion } from './conversion'
import SkinAdapter from '../adapters/skin-adapter'
import WarnAdapter from '../adapters/warn-adapter'
import PackMcmetaAdapter from '../adapters/pack-mcmeta-adapter'

export const JE17ToJE18: Conversion = {
    from: 'JE1.7',
    to: 'JE1.8',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 1
        }),
        new WarnAdapter({
            warnings: [
                {
                    find: '^assets/minecraft/lang/\\w+.lang$',
                    send: [
                        "You may want to update translations in '{outDir}/$0'."
                    ]
                },
                {
                    find: [
                        '^assets/minecraft/textures/gui/container/enchanting_table.png$',
                        '^assets/minecraft/textures/gui/widgets.png$'
                    ],
                    send: [
                        "You may want to add new textures in '{outDir}/$0'."
                    ]
                },
                {
                    find: '^pack.mcmeta$',
                    send: [
                        'You may want to add a ton of blockstates and models.',
                        'You may want to add following files:',
                        '{outDir}/assets/minecraft/textures/blocks/coarse_dirt.png',
                        '{outDir}/assets/minecraft/textures/blocks/daylight_detector_inverted_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_acacia_lower.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_acacia_upper.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_birch_lower.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_birch_upper.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_dark_oak_lower.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_dark_oak_upper.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_jungle_lower.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_jungle_upper.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_spruce_lower.png',
                        '{outDir}/assets/minecraft/textures/blocks/door_spruce_upper.png',
                        '{outDir}/assets/minecraft/textures/blocks/iron_trapdoor.png',
                        '{outDir}/assets/minecraft/textures/blocks/prismarine_bricks.png',
                        '{outDir}/assets/minecraft/textures/blocks/prismarine_dark.png',
                        '{outDir}/assets/minecraft/textures/blocks/prismarine_rough.png',
                        '{outDir}/assets/minecraft/textures/blocks/prismarine_rough.png.mcmeta',
                        '{outDir}/assets/minecraft/textures/blocks/red_sandstone_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/red_sandstone_carved.png',
                        '{outDir}/assets/minecraft/textures/blocks/red_sandstone_normal.png',
                        '{outDir}/assets/minecraft/textures/blocks/red_sandstone_smooth.png',
                        '{outDir}/assets/minecraft/textures/blocks/red_sandstone_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/sea_lantern.png',
                        '{outDir}/assets/minecraft/textures/blocks/sea_lantern.png.mcmeta',
                        '{outDir}/assets/minecraft/textures/blocks/slime.png',
                        '{outDir}/assets/minecraft/textures/blocks/sponge_wet.png',
                        '{outDir}/assets/minecraft/textures/blocks/stone_andesite.png',
                        '{outDir}/assets/minecraft/textures/blocks/stone_andesite_smooth.png',
                        '{outDir}/assets/minecraft/textures/blocks/stone_diorite.png',
                        '{outDir}/assets/minecraft/textures/blocks/stone_diorite_smooth.png',
                        '{outDir}/assets/minecraft/textures/blocks/stone_granite.png',
                        '{outDir}/assets/minecraft/textures/blocks/stone_granite_smooth.png',
                        '{outDir}/assets/minecraft/textures/effect/dither.png',
                        '{outDir}/assets/minecraft/textures/entity/alex.png',
                        '{outDir}/assets/minecraft/textures/entity/armorstand/wood.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/base.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/border.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/bricks.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/circle.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/creeper.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/cross.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/curly_border.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/diagonal_left.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/diagonal_right.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/diagonal_up_left.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/diagonal_up_right.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/flower.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/gradient.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/gradient_up.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/half_horizontal.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/half_horizontal_bottom.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/half_vertical.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/half_vertical_right.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/mojang.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/rhombus.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/skull.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/small_stripes.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/square_bottom_left.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/square_bottom_right.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/square_top_left.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/square_top_right.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/straight_cross.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_bottom.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_center.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_downleft.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_downright.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_left.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_middle.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_right.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/stripe_top.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/triangles_bottom.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/triangles_top.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/triangle_bottom.png',
                        '{outDir}/assets/minecraft/textures/entity/banner/triangle_top.png',
                        '{outDir}/assets/minecraft/textures/entity/banner_base.png',
                        '{outDir}/assets/minecraft/textures/entity/endermite.png',
                        '{outDir}/assets/minecraft/textures/entity/guardian.png',
                        '{outDir}/assets/minecraft/textures/entity/guardian_beam.png',
                        '{outDir}/assets/minecraft/textures/entity/guardian_elder.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/black.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/brown.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/caerbannog.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/gold.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/salt.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/toast.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/white.png',
                        '{outDir}/assets/minecraft/textures/entity/rabbit/white_splotched.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/chaos.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/delight.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/drought.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/isles.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/luck.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/madness.png',
                        '{outDir}/assets/minecraft/textures/gui/presets/water.png',
                        '{outDir}/assets/minecraft/textures/gui/server_selection.png',
                        '{outDir}/assets/minecraft/textures/gui/spectator_widgets.png',
                        '{outDir}/assets/minecraft/textures/gui/stream_indicator.png',
                        '{outDir}/assets/minecraft/textures/items/banner_base.png',
                        '{outDir}/assets/minecraft/textures/items/banner_overlay.png',
                        '{outDir}/assets/minecraft/textures/items/barrier.png',
                        '{outDir}/assets/minecraft/textures/items/door_acacia.png',
                        '{outDir}/assets/minecraft/textures/items/door_birch.png',
                        '{outDir}/assets/minecraft/textures/items/door_dark_oak.png',
                        '{outDir}/assets/minecraft/textures/items/door_jungle.png',
                        '{outDir}/assets/minecraft/textures/items/door_spruce.png',
                        '{outDir}/assets/minecraft/textures/items/mutton_cooked.png',
                        '{outDir}/assets/minecraft/textures/items/mutton_raw.png',
                        '{outDir}/assets/minecraft/textures/items/prismarine_crystals.png',
                        '{outDir}/assets/minecraft/textures/items/prismarine_shard.png',
                        '{outDir}/assets/minecraft/textures/items/rabbit_cooked.png',
                        '{outDir}/assets/minecraft/textures/items/rabbit_foot.png',
                        '{outDir}/assets/minecraft/textures/items/rabbit_hide.png',
                        '{outDir}/assets/minecraft/textures/items/rabbit_raw.png',
                        '{outDir}/assets/minecraft/textures/items/rabbit_stew.png',
                        '{outDir}/assets/minecraft/textures/items/wooden_armorstand.png',
                        '{outDir}/assets/minecraft/textures/misc/forcefield.png',
                        '{outDir}/assets/minecraft/textures/misc/unknown_server.png'
                    ]
                }
            ]
        }),
        new SkinAdapter({
            find: '^assets/minecraft/textures/entity/steve\\.png$',
            type: 'singleToDouble'
        })
    ]
}

export default JE17ToJE18
