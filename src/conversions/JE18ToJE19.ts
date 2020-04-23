import { standardizeNid } from '../utils/utils'
import { loadImage } from 'canvas'
import Conversion from './Conversion'
import PathAdapter from '../adapters/general/PathAdapter'
import PackMcmetaAdapter from '../adapters/general/PackMcmetaAdapter'
import ResourceFilter from '../utils/ResourceFilter'
import SplitAdapter from '../adapters/je18-je19/SplitAdapter'
import WarnAdapter from '../adapters/general/WarnAdapter'
import Whole from '../utils/Whole'
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
                    filter: new ResourceFilter('models', 'minecraft:block/fire_floor_main', ['json']),
                    set: 'minecraft:block/fire_floor0'
                },
                {
                    filter: new ResourceFilter('models', 'minecraft:block/fire_u1', ['json']),
                    set: 'minecraft:block/fire_up'
                },
                {
                    filter: new ResourceFilter('models', 'minecraft:block/fire_u2', ['json']),
                    set: 'minecraft:block/fire_up_alt'
                },
                {
                    filter: new ResourceFilter('models', 'minecraft:block/mossy_wall_post', ['json']),
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
                    find: /^pack\.mcmeta$/,
                    send: [
                        'You may want to add or cater for following resources:',
                        "'blockstate | json | minecraft:beetroots'",
                        "'blockstate | json | minecraft:chain_command_block'",
                        "'blockstate | json | minecraft:chorus_flower'",
                        "'blockstate | json | minecraft:chorus_plant'",
                        "'blockstate | json | minecraft:end_bricks'",
                        "'blockstate | json | minecraft:end_rod'",
                        "'blockstate | json | minecraft:frosted_ice'",
                        "'blockstate | json | minecraft:grass_path'",
                        "'blockstate | json | minecraft:purpur_block'",
                        "'blockstate | json | minecraft:purpur_double_slab'",
                        "'blockstate | json | minecraft:purpur_pillar'",
                        "'blockstate | json | minecraft:purpur_slab'",
                        "'blockstate | json | minecraft:purpur_stairs'",
                        "'blockstate | json | minecraft:repeating_command_block'",
                        "'blockstate | json | minecraft:structure_block'",
                        "'model | json | minecraft:item/acacia_boat'",
                        "'model | json | minecraft:item/beetroot'",
                        "'model | json | minecraft:item/beetroot_seeds'",
                        "'model | json | minecraft:item/beetroot_soup'",
                        "'model | json | minecraft:item/birch_boat'",
                        "'model | json | minecraft:item/bottle_lingering'",
                        "'model | json | minecraft:item/broken_elytra'",
                        "'model | json | minecraft:item/chain_command_block'",
                        "'model | json | minecraft:item/chorus_flower'",
                        "'model | json | minecraft:item/chorus_fruit'",
                        "'model | json | minecraft:item/chorus_fruit_popped'",
                        "'model | json | minecraft:item/chorus_plant'",
                        "'model | json | minecraft:item/dark_oak_boat'",
                        "'model | json | minecraft:item/dragon_breath'",
                        "'model | json | minecraft:item/elytra'",
                        "'model | json | minecraft:item/end_bricks'",
                        "'model | json | minecraft:item/end_crystal'",
                        "'model | json | minecraft:item/end_rod'",
                        "'model | json | minecraft:item/grass_path'",
                        "'model | json | minecraft:item/jungle_boat'",
                        "'model | json | minecraft:item/oak_boat'",
                        "'model | json | minecraft:item/purpur_block'",
                        "'model | json | minecraft:item/purpur_pillar'",
                        "'model | json | minecraft:item/purpur_slab'",
                        "'model | json | minecraft:item/purpur_stairs'",
                        "'model | json | minecraft:item/repeating_command_block'",
                        "'model | json | minecraft:item/shield'",
                        "'model | json | minecraft:item/shield_blocking'",
                        "'model | json | minecraft:item/skull_dragon'",
                        "'model | json | minecraft:item/spectral_arrow'",
                        "'model | json | minecraft:item/spruce_boat'",
                        "'model | json | minecraft:item/structure_block'",
                        "'model | json | minecraft:item/tipped_arrow'"
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

async function getAdaptersForClockOrCompass(whole: Whole, modelNid: string, expectedParent: string, textureNid: string) {
    let model = whole.models.json[modelNid]
    let count = 1
    if (model) {
        if (model instanceof Buffer) {
            model = JSON.parse(model.toString('utf8')) as Model
        }
        // There is model defined in the resource pack.
        if (model && model.textures && model.textures.layer0 &&
            model.parent && standardizeNid(model.parent) === expectedParent) {
            // This model is valid.
            textureNid = standardizeNid(model.textures.layer0)
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

    let texture = whole.textures.png[textureNid]
    if (texture instanceof Buffer) {
        texture = await loadImage(texture)
    }
    if (texture) {
        count = texture.height / texture.width
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
                modelFilter: new ResourceFilter('models', modelNid, ['json']),
                textureFilter: new ResourceFilter('textures', textureNid, ['png']),
                count
            }
        )
    ]
}
