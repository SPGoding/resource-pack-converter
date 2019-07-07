import Conversion from './Conversion'
import PathAdapter from '../adapters/general/PathAdapter'
import PackMcmetaAdapter from '../adapters/general/PackMcmetaAdapter'
import ResourceFilter from '../utils/ResourceFilter'
import SplitAdapter from '../adapters/je18-je19/SplitAdapter'
import WarnAdapter from '../adapters/general/WarnAdapter'
import Whole from '../utils/Whole'
import { standardizeNid, getRelFromNid } from '../utils/utils'
import Model from '../utils/Model'

export default {
    from: 'JE1.8',
    to: 'JE1.9',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 2
        }),
        new PathAdapter({
            operations: [
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/fire_floor_main$/], ['json']),
                    set: 'minecraft:block/fire_floor0'
                },
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/fire_u1$/], ['json']),
                    set: 'minecraft:block/fire_up'
                },
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/fire_u2$/], ['json']),
                    set: 'minecraft:block/fire_up_alt'
                },
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/mossy_wall_post$/], ['json']),
                    set: 'minecraft:block/mossy_cobblestone_wall_post'
                }
            ]
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
                        /^assets\/minecraft\/textures\/gui\/container\/brewing_stand\.png$/,
                        /^assets\/minecraft\/textures\/gui\/container\/creative_inventory\/tab_inventory\.png$/,
                        /^assets\/minecraft\/textures\/gui\/container\/inventory\\.png$/,
                        /^assets\/minecraft\/textures\/gui\/container\/stats_icons\\.png$/,
                        /^assets\/minecraft\/textures\/gui\/icons\.png$/,
                        /^assets\/minecraft\/textures\/gui\/widgets\.png$/
                    ],
                    send: [
                        'You may want to add new textures.'
                    ]
                },
                {
                    find: [
                        /^assets\/minecraft\/models\/item\/clock\.json$/,
                        /^assets\/minecraft\/textures\/items\/clock\.png\.mcmeta?$/,
                        /^assets\/minecraft\/models\/item\/compass\.json$/,
                        /^assets\/minecraft\/textures\/items\/compass\.png\.mcmeta?$/,
                    ],
                    send: [
                        'This file may not work as intended.'
                    ]
                },
                {
                    find: /^pack\.mcmeta$/,
                    send: [
                        'You may want to add following files:',
                        "'minecraft:blocks/acacia_fence_side'",
                        "'minecraft:blocks/beetroots_stage0'",
                        "'minecraft:blocks/beetroots_stage1'",
                        "'minecraft:blocks/beetroots_stage2'",
                        "'minecraft:blocks/beetroots_stage3'",
                        "'minecraft:blocks/birch_fence_side'",
                        "'minecraft:blocks/black_stained_glass_pane_noside'",
                        "'minecraft:blocks/black_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/black_stained_glass_pane_post'",
                        "'minecraft:blocks/black_stained_glass_pane_side'",
                        "'minecraft:blocks/black_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/blue_stained_glass_pane_noside'",
                        "'minecraft:blocks/blue_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/blue_stained_glass_pane_post'",
                        "'minecraft:blocks/blue_stained_glass_pane_side'",
                        "'minecraft:blocks/blue_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/brewing_stand'",
                        "'minecraft:blocks/brewing_stand_bottle0'",
                        "'minecraft:blocks/brewing_stand_bottle1'",
                        "'minecraft:blocks/brewing_stand_bottle2'",
                        "'minecraft:blocks/brewing_stand_empty0'",
                        "'minecraft:blocks/brewing_stand_empty1'",
                        "'minecraft:blocks/brewing_stand_empty2'",
                        "'minecraft:blocks/brown_stained_glass_pane_noside'",
                        "'minecraft:blocks/brown_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/brown_stained_glass_pane_post'",
                        "'minecraft:blocks/brown_stained_glass_pane_side'",
                        "'minecraft:blocks/brown_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/chain_command_blocks'",
                        "'minecraft:blocks/chain_command_blocks_back'",
                        "'minecraft:blocks/chain_command_blocks_conditional'",
                        "'minecraft:blocks/chain_command_blocks_conditional'",
                        "'minecraft:blocks/chain_command_blocks_front'",
                        "'minecraft:blocks/chain_command_blocks_side'",
                        "'minecraft:blocks/chorus_flower'",
                        "'minecraft:blocks/chorus_flower'",
                        "'minecraft:blocks/chorus_flower_dead'",
                        "'minecraft:blocks/chorus_flower_dead'",
                        "'minecraft:blocks/chorus_plant'",
                        "'minecraft:blocks/chorus_plant'",
                        "'minecraft:blocks/chorus_plant_noside'",
                        "'minecraft:blocks/chorus_plant_noside1'",
                        "'minecraft:blocks/chorus_plant_noside2'",
                        "'minecraft:blocks/chorus_plant_noside3'",
                        "'minecraft:blocks/chorus_plant_side'",
                        "'minecraft:blocks/cobblestone_wall_side'",
                        "'minecraft:blocks/command_blocks_back'",
                        "'minecraft:blocks/command_blocks_conditional'",
                        "'minecraft:blocks/command_blocks_conditional'",
                        "'minecraft:blocks/command_blocks_front'",
                        "'minecraft:blocks/command_blocks_side'",
                        "'minecraft:blocks/cube_directional'",
                        "'minecraft:blocks/cyan_stained_glass_pane_noside'",
                        "'minecraft:blocks/cyan_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/cyan_stained_glass_pane_post'",
                        "'minecraft:blocks/cyan_stained_glass_pane_side'",
                        "'minecraft:blocks/cyan_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/dark_oak_fence_side'",
                        "'minecraft:blocks/debug'",
                        "'minecraft:blocks/debug2'",
                        "'minecraft:blocks/end_bricks'",
                        "'minecraft:blocks/end_bricks'",
                        "'minecraft:blocks/end_rod'",
                        "'minecraft:blocks/end_rod'",
                        "'minecraft:blocks/fence_side'",
                        "'minecraft:blocks/fire_floor1'",
                        "'minecraft:blocks/fire_side'",
                        "'minecraft:blocks/fire_side0'",
                        "'minecraft:blocks/fire_side1'",
                        "'minecraft:blocks/fire_side_alt'",
                        "'minecraft:blocks/fire_side_alt0'",
                        "'minecraft:blocks/fire_side_alt1'",
                        "'minecraft:blocks/fire_up0'",
                        "'minecraft:blocks/fire_up1'",
                        "'minecraft:blocks/fire_up_alt0'",
                        "'minecraft:blocks/fire_up_alt1'",
                        "'minecraft:blocks/frosted_ice_0'",
                        "'minecraft:blocks/frosted_ice_0'",
                        "'minecraft:blocks/frosted_ice_1'",
                        "'minecraft:blocks/frosted_ice_1'",
                        "'minecraft:blocks/frosted_ice_2'",
                        "'minecraft:blocks/frosted_ice_2'",
                        "'minecraft:blocks/frosted_ice_3'",
                        "'minecraft:blocks/frosted_ice_3'",
                        "'minecraft:blocks/glass_pane_noside'",
                        "'minecraft:blocks/glass_pane_noside_alt'",
                        "'minecraft:blocks/glass_pane_post'",
                        "'minecraft:blocks/glass_pane_side'",
                        "'minecraft:blocks/glass_pane_side_alt'",
                        "'minecraft:blocks/grass_path'",
                        "'minecraft:blocks/grass_path_side'",
                        "'minecraft:blocks/grass_path_top'",
                        "'minecraft:blocks/gray_stained_glass_pane_noside'",
                        "'minecraft:blocks/gray_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/gray_stained_glass_pane_post'",
                        "'minecraft:blocks/gray_stained_glass_pane_side'",
                        "'minecraft:blocks/gray_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/green_stained_glass_pane_noside'",
                        "'minecraft:blocks/green_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/green_stained_glass_pane_post'",
                        "'minecraft:blocks/green_stained_glass_pane_side'",
                        "'minecraft:blocks/green_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/half_slab_purpur'",
                        "'minecraft:blocks/iron_bars_cap'",
                        "'minecraft:blocks/iron_bars_cap_alt'",
                        "'minecraft:blocks/iron_bars_post'",
                        "'minecraft:blocks/iron_bars_post_ends'",
                        "'minecraft:blocks/iron_bars_side'",
                        "'minecraft:blocks/iron_bars_side_alt'",
                        "'minecraft:blocks/jungle_fence_side'",
                        "'minecraft:blocks/light_blue_stained_glass_pane_noside'",
                        "'minecraft:blocks/light_blue_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/light_blue_stained_glass_pane_post'",
                        "'minecraft:blocks/light_blue_stained_glass_pane_side'",
                        "'minecraft:blocks/light_blue_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/lime_stained_glass_pane_noside'",
                        "'minecraft:blocks/lime_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/lime_stained_glass_pane_post'",
                        "'minecraft:blocks/lime_stained_glass_pane_side'",
                        "'minecraft:blocks/lime_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/magenta_stained_glass_pane_noside'",
                        "'minecraft:blocks/magenta_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/magenta_stained_glass_pane_post'",
                        "'minecraft:blocks/magenta_stained_glass_pane_side'",
                        "'minecraft:blocks/magenta_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/mossy_cobblestone_wall_side'",
                        "'minecraft:blocks/nether_brick_fence_side'",
                        "'minecraft:blocks/oak_fence_side'",
                        "'minecraft:blocks/orange_stained_glass_pane_noside'",
                        "'minecraft:blocks/orange_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/orange_stained_glass_pane_post'",
                        "'minecraft:blocks/orange_stained_glass_pane_side'",
                        "'minecraft:blocks/orange_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/pane_noside'",
                        "'minecraft:blocks/pane_noside_alt'",
                        "'minecraft:blocks/pane_post'",
                        "'minecraft:blocks/pane_side'",
                        "'minecraft:blocks/pane_side_alt'",
                        "'minecraft:blocks/pink_stained_glass_pane_noside'",
                        "'minecraft:blocks/pink_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/pink_stained_glass_pane_post'",
                        "'minecraft:blocks/pink_stained_glass_pane_side'",
                        "'minecraft:blocks/pink_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/purple_stained_glass_pane_noside'",
                        "'minecraft:blocks/purple_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/purple_stained_glass_pane_post'",
                        "'minecraft:blocks/purple_stained_glass_pane_side'",
                        "'minecraft:blocks/purple_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/purpur_blocks'",
                        "'minecraft:blocks/purpur_blocks'",
                        "'minecraft:blocks/purpur_inner_stairs'",
                        "'minecraft:blocks/purpur_outer_stairs'",
                        "'minecraft:blocks/purpur_pillar'",
                        "'minecraft:blocks/purpur_pillar_top'",
                        "'minecraft:blocks/purpur_pillar_top'",
                        "'minecraft:blocks/purpur_stairs'",
                        "'minecraft:blocks/red_stained_glass_pane_noside'",
                        "'minecraft:blocks/red_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/red_stained_glass_pane_post'",
                        "'minecraft:blocks/red_stained_glass_pane_side'",
                        "'minecraft:blocks/red_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/redstone_dot'",
                        "'minecraft:blocks/redstone_dust_dot'",
                        "'minecraft:blocks/redstone_dust_line0'",
                        "'minecraft:blocks/redstone_dust_line1'",
                        "'minecraft:blocks/redstone_dust_overlay'",
                        "'minecraft:blocks/redstone_side'",
                        "'minecraft:blocks/redstone_side0'",
                        "'minecraft:blocks/redstone_side1'",
                        "'minecraft:blocks/redstone_side_alt'",
                        "'minecraft:blocks/redstone_side_alt0'",
                        "'minecraft:blocks/redstone_side_alt1'",
                        "'minecraft:blocks/redstone_up'",
                        "'minecraft:blocks/repeating_command_blocks'",
                        "'minecraft:blocks/repeating_command_blocks_back'",
                        "'minecraft:blocks/repeating_command_blocks_conditional'",
                        "'minecraft:blocks/repeating_command_blocks_conditional'",
                        "'minecraft:blocks/repeating_command_blocks_front'",
                        "'minecraft:blocks/repeating_command_blocks_side'",
                        "'minecraft:blocks/silver_stained_glass_pane_noside'",
                        "'minecraft:blocks/silver_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/silver_stained_glass_pane_post'",
                        "'minecraft:blocks/silver_stained_glass_pane_side'",
                        "'minecraft:blocks/silver_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/spruce_fence_side'",
                        "'minecraft:blocks/structure_blocks'",
                        "'minecraft:blocks/structure_blocks'",
                        "'minecraft:blocks/structure_blocks_corner'",
                        "'minecraft:blocks/structure_blocks_corner'",
                        "'minecraft:blocks/structure_blocks_data'",
                        "'minecraft:blocks/structure_blocks_data'",
                        "'minecraft:blocks/structure_blocks_load'",
                        "'minecraft:blocks/structure_blocks_load'",
                        "'minecraft:blocks/structure_blocks_save'",
                        "'minecraft:blocks/structure_blocks_save'",
                        "'minecraft:blocks/thin_blocks'",
                        "'minecraft:blocks/tinted_cross'",
                        "'minecraft:blocks/upper_slab_purpur'",
                        "'minecraft:blocks/wall_side'",
                        "'minecraft:blocks/water_overlay'",
                        "'minecraft:blocks/white_stained_glass_pane_noside'",
                        "'minecraft:blocks/white_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/white_stained_glass_pane_post'",
                        "'minecraft:blocks/white_stained_glass_pane_side'",
                        "'minecraft:blocks/white_stained_glass_pane_side_alt'",
                        "'minecraft:blocks/yellow_stained_glass_pane_noside'",
                        "'minecraft:blocks/yellow_stained_glass_pane_noside_alt'",
                        "'minecraft:blocks/yellow_stained_glass_pane_post'",
                        "'minecraft:blocks/yellow_stained_glass_pane_side'",
                        "'minecraft:blocks/yellow_stained_glass_pane_side_alt'",
                        "'minecraft:entity/boat/boat_acacia'",
                        "'minecraft:entity/boat/boat_birch'",
                        "'minecraft:entity/boat/boat_darkoak'",
                        "'minecraft:entity/boat/boat_jungle'",
                        "'minecraft:entity/boat/boat_oak'",
                        "'minecraft:entity/boat/boat_spruce'",
                        "'minecraft:entity/elytra'",
                        "'minecraft:entity/end_gateway_beam'",
                        "'minecraft:entity/enderdragon/dragon_fireball'",
                        "'minecraft:entity/projectiles/arrow'",
                        "'minecraft:entity/projectiles/spectral_arrow'",
                        "'minecraft:entity/projectiles/tipped_arrow'",
                        "'minecraft:entity/shield/base'",
                        "'minecraft:entity/shield/border'",
                        "'minecraft:entity/shield/bricks'",
                        "'minecraft:entity/shield/circle'",
                        "'minecraft:entity/shield/creeper'",
                        "'minecraft:entity/shield/cross'",
                        "'minecraft:entity/shield/curly_border'",
                        "'minecraft:entity/shield/diagonal_left'",
                        "'minecraft:entity/shield/diagonal_right'",
                        "'minecraft:entity/shield/diagonal_up_left'",
                        "'minecraft:entity/shield/diagonal_up_right'",
                        "'minecraft:entity/shield/flower'",
                        "'minecraft:entity/shield/gradient'",
                        "'minecraft:entity/shield/gradient_up'",
                        "'minecraft:entity/shield/half_horizontal'",
                        "'minecraft:entity/shield/half_horizontal_bottom'",
                        "'minecraft:entity/shield/half_vertical'",
                        "'minecraft:entity/shield/half_vertical_right'",
                        "'minecraft:entity/shield/mojang'",
                        "'minecraft:entity/shield/rhombus'",
                        "'minecraft:entity/shield/skull'",
                        "'minecraft:entity/shield/small_stripes'",
                        "'minecraft:entity/shield/square_bottom_left'",
                        "'minecraft:entity/shield/square_bottom_right'",
                        "'minecraft:entity/shield/square_top_left'",
                        "'minecraft:entity/shield/square_top_right'",
                        "'minecraft:entity/shield/straight_cross'",
                        "'minecraft:entity/shield/stripe_bottom'",
                        "'minecraft:entity/shield/stripe_center'",
                        "'minecraft:entity/shield/stripe_downleft'",
                        "'minecraft:entity/shield/stripe_downright'",
                        "'minecraft:entity/shield/stripe_left'",
                        "'minecraft:entity/shield/stripe_middle'",
                        "'minecraft:entity/shield/stripe_right'",
                        "'minecraft:entity/shield/stripe_top'",
                        "'minecraft:entity/shield/triangle_bottom'",
                        "'minecraft:entity/shield/triangle_top'",
                        "'minecraft:entity/shield/triangles_bottom'",
                        "'minecraft:entity/shield/triangles_top'",
                        "'minecraft:entity/shield_base'",
                        "'minecraft:entity/shield_base_nopattern'",
                        "'minecraft:entity/shulker/endergolem'",
                        "'minecraft:entity/shulker/spark'",
                        "'minecraft:entity/sweep'",
                        "'minecraft:entity/zombie_villager/zombie_butcher'",
                        "'minecraft:entity/zombie_villager/zombie_farmer'",
                        "'minecraft:entity/zombie_villager/zombie_librarian'",
                        "'minecraft:entity/zombie_villager/zombie_priest'",
                        "'minecraft:entity/zombie_villager/zombie_smith'",
                        "'minecraft:entity/zombie_villager/zombie_villager'",
                        "'minecraft:gui/bars'",
                        "'minecraft:gui/world_selection'",
                        "'minecraft:items/acacia_boat'",
                        "'minecraft:items/acacia_boat'",
                        "'minecraft:items/beetroot'",
                        "'minecraft:items/beetroot'",
                        "'minecraft:items/beetroot_seeds'",
                        "'minecraft:items/beetroot_seeds'",
                        "'minecraft:items/beetroot_soup'",
                        "'minecraft:items/beetroot_soup'",
                        "'minecraft:items/birch_boat'",
                        "'minecraft:items/birch_boat'",
                        "'minecraft:items/bottle_lingering'",
                        "'minecraft:items/broken_elytra'",
                        "'minecraft:items/broken_elytra'",
                        "'minecraft:items/chain_command_blocks'",
                        "'minecraft:items/chorus_flower'",
                        "'minecraft:items/chorus_fruit'",
                        "'minecraft:items/chorus_fruit'",
                        "'minecraft:items/chorus_fruit_popped'",
                        "'minecraft:items/chorus_fruit_popped'",
                        "'minecraft:items/chorus_plant'",
                        "'minecraft:items/dark_oak_boat'",
                        "'minecraft:items/dark_oak_boat'",
                        "'minecraft:items/dragon_breath'",
                        "'minecraft:items/dragon_breath'",
                        "'minecraft:items/elytra'",
                        "'minecraft:items/elytra'",
                        "'minecraft:items/empty_armor_slot_shield'",
                        "'minecraft:items/end_bricks'",
                        "'minecraft:items/end_crystal'",
                        "'minecraft:items/end_crystal'",
                        "'minecraft:items/end_rod'",
                        "'minecraft:items/generated'",
                        "'minecraft:items/grass_path'",
                        "'minecraft:items/handheld'",
                        "'minecraft:items/handheld_rod'",
                        "'minecraft:items/jungle_boat'",
                        "'minecraft:items/jungle_boat'",
                        "'minecraft:items/oak_boat'",
                        "'minecraft:items/oak_boat'",
                        "'minecraft:items/potion_bottle_lingering'",
                        "'minecraft:items/purpur_blocks'",
                        "'minecraft:items/purpur_pillar'",
                        "'minecraft:items/purpur_slab'",
                        "'minecraft:items/purpur_stairs'",
                        "'minecraft:items/repeating_command_blocks'",
                        "'minecraft:items/shield'",
                        "'minecraft:items/shield_blocksing'",
                        "'minecraft:items/skull'",
                        "'minecraft:items/skull_dragon'",
                        "'minecraft:items/spectral_arrow'",
                        "'minecraft:items/spectral_arrow'",
                        "'minecraft:items/spruce_boat'",
                        "'minecraft:items/spruce_boat'",
                        "'minecraft:items/structure_blocks'",
                        "'minecraft:items/tipped_arrow'",
                        "'minecraft:items/tipped_arrow_base'",
                        "'minecraft:items/tipped_arrow_head'"
                    ]
                }
            ]
        }),
        (whole: Whole) => {
            return getAdaptersForClockOrCompass(
                whole,
                'minecraft:item/clock',
                'minecraft:builtin/clock',
                'minecraft:items/clock'
            )
        },
        (whole: Whole) => {
            return getAdaptersForClockOrCompass(
                whole,
                'minecraft:item/compass',
                'minecraft:builtin/compass',
                'minecraft:items/compass'
            )
        }
    ]
} as Conversion

function getAdaptersForClockOrCompass(whole: Whole, modelNid: string, expectedParent: string, textureNid: string) {
    const resource = whole.models[modelNid]
    if (resource) {
        resource.value = resource.value || JSON.parse(resource.buffer.toString('utf8'))
        const model = <Model>resource.value
        // There is model defined in the resource pack.
        if (model.textures && model.textures.layer0 &&
            model.parent && standardizeNid(model.parent) === expectedParent) {
            // This model is valid.
            textureNid = model.textures.layer0
        } else {
            // This model is invalid.
            return [
                new WarnAdapter({
                    warnings: [
                        {
                            filter: new ResourceFilter('models', [new RegExp(`^${modelNid}$`)], ['json']),
                            send: [
                                'This model is invalid.'
                            ]
                        }
                    ]
                })
            ]
        }
    }

    return [
        new WarnAdapter({
            warnings: [
                {
                    filter: new ResourceFilter('textures', [new RegExp(`^${textureNid}$`)], ['png.mcmeta']),
                    send: [
                        'This file may not be necessary.'
                    ]
                }
            ]
        }),
        new SplitAdapter(
            {
                modelRel: getRelFromNid(modelNid, 'models', 'json'),
                textureRel: getRelFromNid(textureNid, 'textures', 'png')
            }
        )
    ]
}
