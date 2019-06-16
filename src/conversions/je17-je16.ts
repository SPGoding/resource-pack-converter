import { Conversion } from './conversion'

export const JE17ToJE16: Conversion = {
    from: 'JE1.7',
    to: 'JE1.6',
    adapters: [
        {
            id: 'PathAdapter',
            params: {
                operations: [
                    {
                        find: '^assets/minecraft/textures/items/fish_cod_cooked\\.png(\\.mcmeta)?$',
                        moveTo: 'assets/minecraft/textures/items/fish_cooked.png$1'
                    },
                    {
                        find: '^assets/minecraft/textures/items/fish_cod_raw\\.png(\\.mcmeta)?$',
                        moveTo: 'assets/minecraft/textures/items/fish_raw.png$1'
                    }
                ]
            }
        }
    ]
}

export default JE17ToJE16
