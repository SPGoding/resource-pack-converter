import { Conversion } from './conversion'
import WarnAdapter from '../adapters/general/warn-adapter'
import PackMcmetaAdapter from '../adapters/general/pack-mcmeta-adapter'
import PathAdapter from '../adapters/general/path-adapter'
import ResourceFilter from '../utils/resource-filter'

export const JE19ToJE18: Conversion = {
    from: 'JE1.9',
    to: 'JE1.8',
    adapters: [
        new PackMcmetaAdapter({
            changeFormatTo: 1
        }),
        new PathAdapter({
            operations: [
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/fire_floor0$/], ['json']),
                    set: 'minecraft:block/fire_floor_main'
                },
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/fire_up$/], ['json']),
                    set: 'minecraft:block/fire_u1'
                },
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/fire_up_alt$/], ['json']),
                    set: 'minecraft:block/fire_u2'
                },
                {
                    filter: new ResourceFilter('models', [/^minecraft:block\/mossy_cobblestone_wall_post$/], ['json']),
                    set: 'minecraft:block/mossy_wall_post'
                }
            ]
        }),
        new WarnAdapter({
            warnings: [
                {
                    find: /^pack\.mcmeta$/,
                    send: [
                        'You may want to add following files:',
                        "'assets/minecraft/models/block/acacia_fence_n.json'",
                        "'assets/minecraft/models/block/acacia_fence_ne.json'",
                        "'assets/minecraft/models/block/acacia_fence_ns.json'",
                        "'assets/minecraft/models/block/acacia_fence_nse.json'",
                        "'assets/minecraft/models/block/acacia_fence_nsew.json'",
                        "'assets/minecraft/models/block/acacia_log_side.json'",
                        "'assets/minecraft/models/block/bars_n.json'",
                        "'assets/minecraft/models/block/bars_ne.json'",
                        "'assets/minecraft/models/block/bars_ns.json'",
                        "'assets/minecraft/models/block/bars_nse.json'",
                        "'assets/minecraft/models/block/bars_nsew.json'",
                        "'assets/minecraft/models/block/birch_fence_n.json'",
                        "'assets/minecraft/models/block/birch_fence_ne.json'",
                        "'assets/minecraft/models/block/birch_fence_ns.json'",
                        "'assets/minecraft/models/block/birch_fence_nse.json'",
                        "'assets/minecraft/models/block/birch_fence_nsew.json'",
                        "'assets/minecraft/models/block/birch_log_side.json'",
                        "'assets/minecraft/models/block/black_pane_n.json'",
                        "'assets/minecraft/models/block/black_pane_ne.json'",
                        "'assets/minecraft/models/block/black_pane_ns.json'",
                        "'assets/minecraft/models/block/black_pane_nse.json'",
                        "'assets/minecraft/models/block/black_pane_nsew.json'",
                        "'assets/minecraft/models/block/blue_pane_n.json'",
                        "'assets/minecraft/models/block/blue_pane_ne.json'",
                        "'assets/minecraft/models/block/blue_pane_ns.json'",
                        "'assets/minecraft/models/block/blue_pane_nse.json'",
                        "'assets/minecraft/models/block/blue_pane_nsew.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_1.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_12.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_123.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_13.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_2.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_23.json'",
                        "'assets/minecraft/models/block/brewing_stand_bottles_3.json'",
                        "'assets/minecraft/models/block/brewing_stand_empty.json'",
                        "'assets/minecraft/models/block/brown_pane_n.json'",
                        "'assets/minecraft/models/block/brown_pane_ne.json'",
                        "'assets/minecraft/models/block/brown_pane_ns.json'",
                        "'assets/minecraft/models/block/brown_pane_nse.json'",
                        "'assets/minecraft/models/block/brown_pane_nsew.json'",
                        "'assets/minecraft/models/block/cobblestone_wall_n.json'",
                        "'assets/minecraft/models/block/cyan_pane_n.json'",
                        "'assets/minecraft/models/block/cyan_pane_ne.json'",
                        "'assets/minecraft/models/block/cyan_pane_ns.json'",
                        "'assets/minecraft/models/block/cyan_pane_nse.json'",
                        "'assets/minecraft/models/block/cyan_pane_nsew.json'",
                        "'assets/minecraft/models/block/dark_oak_fence_n.json'",
                        "'assets/minecraft/models/block/dark_oak_fence_ne.json'",
                        "'assets/minecraft/models/block/dark_oak_fence_ns.json'",
                        "'assets/minecraft/models/block/dark_oak_fence_nse.json'",
                        "'assets/minecraft/models/block/dark_oak_fence_nsew.json'",
                        "'assets/minecraft/models/block/dark_oak_log_side.json'",
                        "'assets/minecraft/models/block/fence_n.json'",
                        "'assets/minecraft/models/block/fence_ne.json'",
                        "'assets/minecraft/models/block/fence_ns.json'",
                        "'assets/minecraft/models/block/fence_nse.json'",
                        "'assets/minecraft/models/block/fence_nsew.json'",
                        "'assets/minecraft/models/block/fire_n.json'",
                        "'assets/minecraft/models/block/fire_ne.json'",
                        "'assets/minecraft/models/block/fire_neu1.json'",
                        "'assets/minecraft/models/block/fire_neu1_alt.json'",
                        "'assets/minecraft/models/block/fire_neu1_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_neu1_flip.json'",
                        "'assets/minecraft/models/block/fire_neu1_flip_main.json'",
                        "'assets/minecraft/models/block/fire_neu1_main.json'",
                        "'assets/minecraft/models/block/fire_neu2.json'",
                        "'assets/minecraft/models/block/fire_neu2_alt.json'",
                        "'assets/minecraft/models/block/fire_neu2_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_neu2_flip.json'",
                        "'assets/minecraft/models/block/fire_neu2_flip_main.json'",
                        "'assets/minecraft/models/block/fire_neu2_main.json'",
                        "'assets/minecraft/models/block/fire_ne_alt.json'",
                        "'assets/minecraft/models/block/fire_ne_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_ne_flip.json'",
                        "'assets/minecraft/models/block/fire_ne_flip_main.json'",
                        "'assets/minecraft/models/block/fire_ne_main.json'",
                        "'assets/minecraft/models/block/fire_ns.json'",
                        "'assets/minecraft/models/block/fire_nse.json'",
                        "'assets/minecraft/models/block/fire_nseu1.json'",
                        "'assets/minecraft/models/block/fire_nseu1_alt.json'",
                        "'assets/minecraft/models/block/fire_nseu1_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nseu1_flip.json'",
                        "'assets/minecraft/models/block/fire_nseu1_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nseu1_main.json'",
                        "'assets/minecraft/models/block/fire_nseu2.json'",
                        "'assets/minecraft/models/block/fire_nseu2_alt.json'",
                        "'assets/minecraft/models/block/fire_nseu2_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nseu2_flip.json'",
                        "'assets/minecraft/models/block/fire_nseu2_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nseu2_main.json'",
                        "'assets/minecraft/models/block/fire_nsew.json'",
                        "'assets/minecraft/models/block/fire_nsewu1.json'",
                        "'assets/minecraft/models/block/fire_nsewu1_alt.json'",
                        "'assets/minecraft/models/block/fire_nsewu1_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nsewu1_flip.json'",
                        "'assets/minecraft/models/block/fire_nsewu1_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nsewu1_main.json'",
                        "'assets/minecraft/models/block/fire_nsewu2.json'",
                        "'assets/minecraft/models/block/fire_nsewu2_alt.json'",
                        "'assets/minecraft/models/block/fire_nsewu2_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nsewu2_flip.json'",
                        "'assets/minecraft/models/block/fire_nsewu2_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nsewu2_main.json'",
                        "'assets/minecraft/models/block/fire_nsew_alt.json'",
                        "'assets/minecraft/models/block/fire_nsew_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nsew_flip.json'",
                        "'assets/minecraft/models/block/fire_nsew_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nsew_main.json'",
                        "'assets/minecraft/models/block/fire_nse_alt.json'",
                        "'assets/minecraft/models/block/fire_nse_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nse_flip.json'",
                        "'assets/minecraft/models/block/fire_nse_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nse_main.json'",
                        "'assets/minecraft/models/block/fire_nsu1.json'",
                        "'assets/minecraft/models/block/fire_nsu1_alt.json'",
                        "'assets/minecraft/models/block/fire_nsu1_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nsu1_flip.json'",
                        "'assets/minecraft/models/block/fire_nsu1_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nsu1_main.json'",
                        "'assets/minecraft/models/block/fire_nsu2.json'",
                        "'assets/minecraft/models/block/fire_nsu2_alt.json'",
                        "'assets/minecraft/models/block/fire_nsu2_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nsu2_flip.json'",
                        "'assets/minecraft/models/block/fire_nsu2_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nsu2_main.json'",
                        "'assets/minecraft/models/block/fire_ns_alt.json'",
                        "'assets/minecraft/models/block/fire_ns_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_ns_flip.json'",
                        "'assets/minecraft/models/block/fire_ns_flip_main.json'",
                        "'assets/minecraft/models/block/fire_ns_main.json'",
                        "'assets/minecraft/models/block/fire_nu1.json'",
                        "'assets/minecraft/models/block/fire_nu1_alt.json'",
                        "'assets/minecraft/models/block/fire_nu1_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nu1_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nu1_main.json'",
                        "'assets/minecraft/models/block/fire_nu2.json'",
                        "'assets/minecraft/models/block/fire_nu2_alt.json'",
                        "'assets/minecraft/models/block/fire_nu2_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_nu2_flip.json'",
                        "'assets/minecraft/models/block/fire_nu2_flip_main.json'",
                        "'assets/minecraft/models/block/fire_nu2_main.json'",
                        "'assets/minecraft/models/block/fire_n_alt.json'",
                        "'assets/minecraft/models/block/fire_n_alt_flip.json'",
                        "'assets/minecraft/models/block/fire_n_flip.json'",
                        "'assets/minecraft/models/block/fire_n_flip_main.json'",
                        "'assets/minecraft/models/block/fire_n_main.json'",
                        "'assets/minecraft/models/block/fire_u1_main.json'",
                        "'assets/minecraft/models/block/fire_u2_main.json'",
                        "'assets/minecraft/models/block/glass_pane_n.json'",
                        "'assets/minecraft/models/block/glass_pane_ne.json'",
                        "'assets/minecraft/models/block/glass_pane_ns.json'",
                        "'assets/minecraft/models/block/glass_pane_nse.json'",
                        "'assets/minecraft/models/block/glass_pane_nsew.json'",
                        "'assets/minecraft/models/block/gray_pane_n.json'",
                        "'assets/minecraft/models/block/gray_pane_ne.json'",
                        "'assets/minecraft/models/block/gray_pane_ns.json'",
                        "'assets/minecraft/models/block/gray_pane_nse.json'",
                        "'assets/minecraft/models/block/gray_pane_nsew.json'",
                        "'assets/minecraft/models/block/green_pane_n.json'",
                        "'assets/minecraft/models/block/green_pane_ne.json'",
                        "'assets/minecraft/models/block/green_pane_ns.json'",
                        "'assets/minecraft/models/block/green_pane_nse.json'",
                        "'assets/minecraft/models/block/green_pane_nsew.json'",
                        "'assets/minecraft/models/block/hay_side.json'",
                        "'assets/minecraft/models/block/heavy_pressure_plate_inventory.json'",
                        "'assets/minecraft/models/block/jungle_fence_n.json'",
                        "'assets/minecraft/models/block/jungle_fence_ne.json'",
                        "'assets/minecraft/models/block/jungle_fence_ns.json'",
                        "'assets/minecraft/models/block/jungle_fence_nse.json'",
                        "'assets/minecraft/models/block/jungle_fence_nsew.json'",
                        "'assets/minecraft/models/block/jungle_log_side.json'",
                        "'assets/minecraft/models/block/light_blue_pane_n.json'",
                        "'assets/minecraft/models/block/light_blue_pane_ne.json'",
                        "'assets/minecraft/models/block/light_blue_pane_ns.json'",
                        "'assets/minecraft/models/block/light_blue_pane_nse.json'",
                        "'assets/minecraft/models/block/light_blue_pane_nsew.json'",
                        "'assets/minecraft/models/block/light_pressure_plate_inventory.json'",
                        "'assets/minecraft/models/block/lime_pane_n.json'",
                        "'assets/minecraft/models/block/lime_pane_ne.json'",
                        "'assets/minecraft/models/block/lime_pane_ns.json'",
                        "'assets/minecraft/models/block/lime_pane_nse.json'",
                        "'assets/minecraft/models/block/lime_pane_nsew.json'",
                        "'assets/minecraft/models/block/magenta_pane_n.json'",
                        "'assets/minecraft/models/block/magenta_pane_ne.json'",
                        "'assets/minecraft/models/block/magenta_pane_ns.json'",
                        "'assets/minecraft/models/block/magenta_pane_nse.json'",
                        "'assets/minecraft/models/block/magenta_pane_nsew.json'",
                        "'assets/minecraft/models/block/mossy_wall_n.json'",
                        "'assets/minecraft/models/block/mossy_wall_ne.json'",
                        "'assets/minecraft/models/block/mossy_wall_ns.json'",
                        "'assets/minecraft/models/block/mossy_wall_nse.json'",
                        "'assets/minecraft/models/block/mossy_wall_nsew.json'",
                        "'assets/minecraft/models/block/mossy_wall_ns_above.json'",
                        "'assets/minecraft/models/block/nether_brick_fence_n.json'",
                        "'assets/minecraft/models/block/nether_brick_fence_ne.json'",
                        "'assets/minecraft/models/block/nether_brick_fence_ns.json'",
                        "'assets/minecraft/models/block/nether_brick_fence_nse.json'",
                        "'assets/minecraft/models/block/nether_brick_fence_nsew.json'",
                        "'assets/minecraft/models/block/oak_fence_n.json'",
                        "'assets/minecraft/models/block/oak_fence_ne.json'",
                        "'assets/minecraft/models/block/oak_fence_ns.json'",
                        "'assets/minecraft/models/block/oak_fence_nse.json'",
                        "'assets/minecraft/models/block/oak_fence_nsew.json'",
                        "'assets/minecraft/models/block/oak_log_side.json'",
                        "'assets/minecraft/models/block/orange_pane_n.json'",
                        "'assets/minecraft/models/block/orange_pane_ne.json'",
                        "'assets/minecraft/models/block/orange_pane_ns.json'",
                        "'assets/minecraft/models/block/orange_pane_nse.json'",
                        "'assets/minecraft/models/block/orange_pane_nsew.json'",
                        "'assets/minecraft/models/block/pane_n.json'",
                        "'assets/minecraft/models/block/pane_ne.json'",
                        "'assets/minecraft/models/block/pane_ns.json'",
                        "'assets/minecraft/models/block/pane_nse.json'",
                        "'assets/minecraft/models/block/pane_nsew.json'",
                        "'assets/minecraft/models/block/pink_pane_n.json'",
                        "'assets/minecraft/models/block/pink_pane_ne.json'",
                        "'assets/minecraft/models/block/pink_pane_ns.json'",
                        "'assets/minecraft/models/block/pink_pane_nse.json'",
                        "'assets/minecraft/models/block/pink_pane_nsew.json'",
                        "'assets/minecraft/models/block/pressure_plate_inventory.json'",
                        "'assets/minecraft/models/block/purple_pane_n.json'",
                        "'assets/minecraft/models/block/purple_pane_ne.json'",
                        "'assets/minecraft/models/block/purple_pane_ns.json'",
                        "'assets/minecraft/models/block/purple_pane_nse.json'",
                        "'assets/minecraft/models/block/purple_pane_nsew.json'",
                        "'assets/minecraft/models/block/redstone_n.json'",
                        "'assets/minecraft/models/block/redstone_ne.json'",
                        "'assets/minecraft/models/block/redstone_none.json'",
                        "'assets/minecraft/models/block/redstone_nse.json'",
                        "'assets/minecraft/models/block/redstone_nsew.json'",
                        "'assets/minecraft/models/block/redstone_nsue.json'",
                        "'assets/minecraft/models/block/redstone_nue.json'",
                        "'assets/minecraft/models/block/redstone_nuse.json'",
                        "'assets/minecraft/models/block/redstone_nusue.json'",
                        "'assets/minecraft/models/block/redstone_ueuw.json'",
                        "'assets/minecraft/models/block/redstone_uew.json'",
                        "'assets/minecraft/models/block/redstone_une.json'",
                        "'assets/minecraft/models/block/redstone_uns.json'",
                        "'assets/minecraft/models/block/redstone_unse.json'",
                        "'assets/minecraft/models/block/redstone_unsew.json'",
                        "'assets/minecraft/models/block/redstone_unsue.json'",
                        "'assets/minecraft/models/block/redstone_unsuew.json'",
                        "'assets/minecraft/models/block/redstone_unue.json'",
                        "'assets/minecraft/models/block/redstone_unus.json'",
                        "'assets/minecraft/models/block/redstone_unuse.json'",
                        "'assets/minecraft/models/block/redstone_unusew.json'",
                        "'assets/minecraft/models/block/redstone_unusue.json'",
                        "'assets/minecraft/models/block/redstone_unusueuw.json'",
                        "'assets/minecraft/models/block/redstone_unusuew.json'",
                        "'assets/minecraft/models/block/red_pane_n.json'",
                        "'assets/minecraft/models/block/red_pane_ne.json'",
                        "'assets/minecraft/models/block/red_pane_ns.json'",
                        "'assets/minecraft/models/block/red_pane_nse.json'",
                        "'assets/minecraft/models/block/red_pane_nsew.json'",
                        "'assets/minecraft/models/block/silver_pane_n.json'",
                        "'assets/minecraft/models/block/silver_pane_ne.json'",
                        "'assets/minecraft/models/block/silver_pane_ns.json'",
                        "'assets/minecraft/models/block/silver_pane_nse.json'",
                        "'assets/minecraft/models/block/silver_pane_nsew.json'",
                        "'assets/minecraft/models/block/spruce_fence_n.json'",
                        "'assets/minecraft/models/block/spruce_fence_ne.json'",
                        "'assets/minecraft/models/block/spruce_fence_ns.json'",
                        "'assets/minecraft/models/block/spruce_fence_nse.json'",
                        "'assets/minecraft/models/block/spruce_fence_nsew.json'",
                        "'assets/minecraft/models/block/spruce_log_side.json'",
                        "'assets/minecraft/models/block/stone_pressure_plate_inventory.json'",
                        "'assets/minecraft/models/block/tallgrass.json'",
                        "'assets/minecraft/models/block/tripwire_attached_suspended_n.json'",
                        "'assets/minecraft/models/block/tripwire_attached_suspended_ne.json'",
                        "'assets/minecraft/models/block/tripwire_attached_suspended_ns.json'",
                        "'assets/minecraft/models/block/tripwire_attached_suspended_nse.json'",
                        "'assets/minecraft/models/block/tripwire_attached_suspended_nsew.json'",
                        "'assets/minecraft/models/block/tripwire_hook_attached_suspended.json'",
                        "'assets/minecraft/models/block/tripwire_hook_attached_suspended_powered.json'",
                        "'assets/minecraft/models/block/tripwire_suspended_n.json'",
                        "'assets/minecraft/models/block/tripwire_suspended_ne.json'",
                        "'assets/minecraft/models/block/tripwire_suspended_ns.json'",
                        "'assets/minecraft/models/block/tripwire_suspended_nse.json'",
                        "'assets/minecraft/models/block/tripwire_suspended_nsew.json'",
                        "'assets/minecraft/models/block/wall_n.json'",
                        "'assets/minecraft/models/block/wall_ne.json'",
                        "'assets/minecraft/models/block/wall_ns.json'",
                        "'assets/minecraft/models/block/wall_nse.json'",
                        "'assets/minecraft/models/block/wall_nsew.json'",
                        "'assets/minecraft/models/block/wall_ns_above.json'",
                        "'assets/minecraft/models/block/white_pane_n.json'",
                        "'assets/minecraft/models/block/white_pane_ne.json'",
                        "'assets/minecraft/models/block/white_pane_ns.json'",
                        "'assets/minecraft/models/block/white_pane_nse.json'",
                        "'assets/minecraft/models/block/white_pane_nsew.json'",
                        "'assets/minecraft/models/block/wooden_pressure_plate_inventory.json'",
                        "'assets/minecraft/models/block/yellow_pane_n.json'",
                        "'assets/minecraft/models/block/yellow_pane_ne.json'",
                        "'assets/minecraft/models/block/yellow_pane_ns.json'",
                        "'assets/minecraft/models/block/yellow_pane_nse.json'",
                        "'assets/minecraft/models/block/yellow_pane_nsew.json'",
                        "'assets/minecraft/models/item/boat.json'",
                        "'assets/minecraft/textures/blocks/command_block.png'",
                        "'assets/minecraft/textures/blocks/redstone_dust_cross.png'",
                        "'assets/minecraft/textures/blocks/redstone_dust_cross_overlay.png'",
                        "'assets/minecraft/textures/blocks/redstone_dust_line.png'",
                        "'assets/minecraft/textures/blocks/redstone_dust_line_overlay.png'",
                        "'assets/minecraft/textures/entity/boat.png'",
                        "'assets/minecraft/textures/items/boat.png'",
                        "'assets/minecraft/textures/items/clock.png'",
                        "'assets/minecraft/textures/items/clock.png.mcmeta'",
                        "'assets/minecraft/textures/items/compass.png'",
                        "'assets/minecraft/textures/items/compass.png.mcmeta'",
                        "'assets/minecraft/textures/items/quiver.png'"
                    ]
                }
            ]
        })
    ]
}

export default JE19ToJE18
