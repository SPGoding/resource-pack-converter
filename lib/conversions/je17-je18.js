"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warn_adapter_1 = require("../adapters/general/warn-adapter");
const pack_mcmeta_adapter_1 = require("../adapters/general/pack-mcmeta-adapter");
const skin_adapter_1 = require("../adapters/je17-je18/skin-adapter");
exports.JE17ToJE18 = {
    from: 'JE1.7',
    to: 'JE1.8',
    adapters: [
        new pack_mcmeta_adapter_1.default({
            changeFormatTo: 1
        }),
        new warn_adapter_1.default({
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
                        'You may want to add following files:',
                        "'minecraft:blocks/coarse_dirt'",
                        "'minecraft:blocks/daylight_detector_inverted_top'",
                        "'minecraft:blocks/door_acacia_lower'",
                        "'minecraft:blocks/door_acacia_upper'",
                        "'minecraft:blocks/door_birch_lower'",
                        "'minecraft:blocks/door_birch_upper'",
                        "'minecraft:blocks/door_dark_oak_lower'",
                        "'minecraft:blocks/door_dark_oak_upper'",
                        "'minecraft:blocks/door_jungle_lower'",
                        "'minecraft:blocks/door_jungle_upper'",
                        "'minecraft:blocks/door_spruce_lower'",
                        "'minecraft:blocks/door_spruce_upper'",
                        "'minecraft:blocks/iron_trapdoor'",
                        "'minecraft:blocks/prismarine_bricks'",
                        "'minecraft:blocks/prismarine_dark'",
                        "'minecraft:blocks/prismarine_rough'",
                        "'minecraft:blocks/prismarine_rough.mcmeta'",
                        "'minecraft:blocks/red_sandstone_bottom'",
                        "'minecraft:blocks/red_sandstone_carved'",
                        "'minecraft:blocks/red_sandstone_normal'",
                        "'minecraft:blocks/red_sandstone_smooth'",
                        "'minecraft:blocks/red_sandstone_top'",
                        "'minecraft:blocks/sea_lantern'",
                        "'minecraft:blocks/sea_lantern.mcmeta'",
                        "'minecraft:blocks/slime'",
                        "'minecraft:blocks/sponge_wet'",
                        "'minecraft:blocks/stone_andesite'",
                        "'minecraft:blocks/stone_andesite_smooth'",
                        "'minecraft:blocks/stone_diorite'",
                        "'minecraft:blocks/stone_diorite_smooth'",
                        "'minecraft:blocks/stone_granite'",
                        "'minecraft:blocks/stone_granite_smooth'",
                        "'minecraft:effect/dither'",
                        "'minecraft:entity/alex'",
                        "'minecraft:entity/armorstand/wood'",
                        "'minecraft:entity/banner/base'",
                        "'minecraft:entity/banner/border'",
                        "'minecraft:entity/banner/bricks'",
                        "'minecraft:entity/banner/circle'",
                        "'minecraft:entity/banner/creeper'",
                        "'minecraft:entity/banner/cross'",
                        "'minecraft:entity/banner/curly_border'",
                        "'minecraft:entity/banner/diagonal_left'",
                        "'minecraft:entity/banner/diagonal_right'",
                        "'minecraft:entity/banner/diagonal_up_left'",
                        "'minecraft:entity/banner/diagonal_up_right'",
                        "'minecraft:entity/banner/flower'",
                        "'minecraft:entity/banner/gradient'",
                        "'minecraft:entity/banner/gradient_up'",
                        "'minecraft:entity/banner/half_horizontal'",
                        "'minecraft:entity/banner/half_horizontal_bottom'",
                        "'minecraft:entity/banner/half_vertical'",
                        "'minecraft:entity/banner/half_vertical_right'",
                        "'minecraft:entity/banner/mojang'",
                        "'minecraft:entity/banner/rhombus'",
                        "'minecraft:entity/banner/skull'",
                        "'minecraft:entity/banner/small_stripes'",
                        "'minecraft:entity/banner/square_bottom_left'",
                        "'minecraft:entity/banner/square_bottom_right'",
                        "'minecraft:entity/banner/square_top_left'",
                        "'minecraft:entity/banner/square_top_right'",
                        "'minecraft:entity/banner/straight_cross'",
                        "'minecraft:entity/banner/stripe_bottom'",
                        "'minecraft:entity/banner/stripe_center'",
                        "'minecraft:entity/banner/stripe_downleft'",
                        "'minecraft:entity/banner/stripe_downright'",
                        "'minecraft:entity/banner/stripe_left'",
                        "'minecraft:entity/banner/stripe_middle'",
                        "'minecraft:entity/banner/stripe_right'",
                        "'minecraft:entity/banner/stripe_top'",
                        "'minecraft:entity/banner/triangles_bottom'",
                        "'minecraft:entity/banner/triangles_top'",
                        "'minecraft:entity/banner/triangle_bottom'",
                        "'minecraft:entity/banner/triangle_top'",
                        "'minecraft:entity/banner_base'",
                        "'minecraft:entity/endermite'",
                        "'minecraft:entity/guardian'",
                        "'minecraft:entity/guardian_beam'",
                        "'minecraft:entity/guardian_elder'",
                        "'minecraft:entity/rabbit/black'",
                        "'minecraft:entity/rabbit/brown'",
                        "'minecraft:entity/rabbit/caerbannog'",
                        "'minecraft:entity/rabbit/gold'",
                        "'minecraft:entity/rabbit/salt'",
                        "'minecraft:entity/rabbit/toast'",
                        "'minecraft:entity/rabbit/white'",
                        "'minecraft:entity/rabbit/white_splotched'",
                        "'minecraft:gui/presets/chaos'",
                        "'minecraft:gui/presets/delight'",
                        "'minecraft:gui/presets/drought'",
                        "'minecraft:gui/presets/isles'",
                        "'minecraft:gui/presets/luck'",
                        "'minecraft:gui/presets/madness'",
                        "'minecraft:gui/presets/water'",
                        "'minecraft:gui/server_selection'",
                        "'minecraft:gui/spectator_widgets'",
                        "'minecraft:gui/stream_indicator'",
                        "'minecraft:items/banner_base'",
                        "'minecraft:items/banner_overlay'",
                        "'minecraft:items/barrier'",
                        "'minecraft:items/door_acacia'",
                        "'minecraft:items/door_birch'",
                        "'minecraft:items/door_dark_oak'",
                        "'minecraft:items/door_jungle'",
                        "'minecraft:items/door_spruce'",
                        "'minecraft:items/mutton_cooked'",
                        "'minecraft:items/mutton_raw'",
                        "'minecraft:items/prismarine_crystals'",
                        "'minecraft:items/prismarine_shard'",
                        "'minecraft:items/rabbit_cooked'",
                        "'minecraft:items/rabbit_foot'",
                        "'minecraft:items/rabbit_hide'",
                        "'minecraft:items/rabbit_raw'",
                        "'minecraft:items/rabbit_stew'",
                        "'minecraft:items/wooden_armorstand'",
                        "'minecraft:misc/forcefield'",
                        "'minecraft:misc/unknown_server'"
                    ]
                }
            ]
        }),
        new skin_adapter_1.default({
            find: /^assets\/minecraft\/textures\/entity\/steve\.png$/
        })
    ]
};
exports.default = exports.JE17ToJE18;
//# sourceMappingURL=je17-je18.js.map