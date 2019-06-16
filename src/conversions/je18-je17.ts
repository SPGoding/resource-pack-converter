import { Conversion } from './conversion'

export const JE18ToJE17: Conversion = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        {
            id: 'SkinAdapter',
            params: {
                find: '^assets/minecraft/textures/entity/steve\\.png$',
                type: 'doubleToSingle'
            }
        }
    ]
}

export default JE18ToJE17
