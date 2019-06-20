import { Conversion } from './conversion'
import WarnAdapter from '../adapters/warn-adapter'

export const JE18ToJE19: Conversion = {
    from: 'JE1.8',
    to: 'JE1.9',
    adapters: [
        new WarnAdapter({
            warnings: [
                {
                    find: [
                        '^assets/minecraft/textures/gui/container/brewing_stand\\.png$',
                        '^assets/minecraft/textures/gui/container/creative_inventory/tab_inventory\\.png$',
                        '^assets/minecraft/textures/gui/container/inventory\\.png$',
                        '^assets/minecraft/textures/gui/container/stats_icons\\.png$',
                        '^assets/minecraft/textures/gui/icons\\.png$',
                        '^assets/minecraft/textures/gui/icons\\.png$',
                        '^assets/minecraft/textures/gui/widgets\\.png$',
                    ],
                    send: [
                        "You may want to add new textures in '{outDir}/$0'."
                    ]
                }]
        })
    ]
}

export default JE18ToJE19
