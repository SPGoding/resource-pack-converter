import { Conversion } from './conversion'
import WarnAdapter from '../adapters/warn-adapter'
import PathAdapter from '../adapters/path-adapter'

export const JE16ToJE17: Conversion = {
    from: 'JE1.6',
    to: 'JE1.7',
    adapters: [
        new WarnAdapter({
            warnings: [
                {
                    find: '^assets/minecraft/lang/\\w+.lang$',
                    send: [
                        "You may want to update translations in '{outDir}/$0'."
                    ]
                },
                {
                    find: '^pack.mcmeta$',
                    send: [
                        'You may want to add following files:',
                        '{outDir}/assets/minecraft/textures/blocks/dirt_podzol_side.png',
                        '{outDir}/assets/minecraft/textures/blocks/dirt_podzol_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_fern_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_fern_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_grass_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_grass_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_paeonia_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_paeonia_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_rose_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_rose_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_sunflower_back.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_sunflower_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_sunflower_front.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_sunflower_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_syringa_bottom.png',
                        '{outDir}/assets/minecraft/textures/blocks/double_plant_syringa_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_allium.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_blue_orchid.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_houstonia.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_oxeye_daisy.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_paeonia.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_tulip_orange.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_tulip_pink.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_tulip_red.png',
                        '{outDir}/assets/minecraft/textures/blocks/flower_tulip_white.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_black.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_blue.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_brown.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_cyan.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_gray.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_green.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_light_blue.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_lime.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_magenta.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_orange.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_black.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_blue.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_brown.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_cyan.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_gray.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_green.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_light_blue.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_lime.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_magenta.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_orange.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_pink.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_purple.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_red.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_silver.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_white.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pane_top_yellow.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_pink.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_purple.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_red.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_silver.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_white.png',
                        '{outDir}/assets/minecraft/textures/blocks/glass_yellow.png',
                        '{outDir}/assets/minecraft/textures/blocks/ice_packed.png',
                        '{outDir}/assets/minecraft/textures/blocks/leaves_acacia.png',
                        '{outDir}/assets/minecraft/textures/blocks/leaves_acacia_opaque.png',
                        '{outDir}/assets/minecraft/textures/blocks/leaves_big_oak.png',
                        '{outDir}/assets/minecraft/textures/blocks/leaves_big_oak_opaque.png',
                        '{outDir}/assets/minecraft/textures/blocks/log_acacia.png',
                        '{outDir}/assets/minecraft/textures/blocks/log_acacia_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/log_big_oak.png',
                        '{outDir}/assets/minecraft/textures/blocks/log_big_oak_top.png',
                        '{outDir}/assets/minecraft/textures/blocks/planks_acacia.png',
                        '{outDir}/assets/minecraft/textures/blocks/planks_big_oak.png',
                        '{outDir}/assets/minecraft/textures/blocks/red_sand.png',
                        '{outDir}/assets/minecraft/textures/blocks/sapling_acacia.png',
                        '{outDir}/assets/minecraft/textures/blocks/sapling_roofed_oak.png',
                        '{outDir}/assets/minecraft/textures/gui/resource_packs.png',
                        '{outDir}/assets/minecraft/textures/items/fish_clownfish_raw.png',
                        '{outDir}/assets/minecraft/textures/items/fish_pufferfish_raw.png',
                        '{outDir}/assets/minecraft/textures/items/fish_salmon_cooked.png',
                        '{outDir}/assets/minecraft/textures/items/fish_salmon_raw.png',
                        '{outDir}/assets/minecraft/textures/items/minecart_command_block.png'
                    ]
                }
            ]
        }),
        new PathAdapter({
            operations: [
                {
                    find: '^assets/minecraft/textures/items/fish_cooked\\.png(\\.mcmeta)?$',
                    moveTo: 'assets/minecraft/textures/items/fish_cod_cooked.png$1'
                },
                {
                    find: '^assets/minecraft/textures/items/fish_raw\\.png(\\.mcmeta)?$',
                    moveTo: 'assets/minecraft/textures/items/fish_cod_raw.png$1'
                }
            ]
        })
    ]
}

export default JE16ToJE17
