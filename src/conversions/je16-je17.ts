import { Conversion } from './conversion'

export const JE16ToJE17: Conversion = {
    from: 'JE1.6',
    to: 'JE1.7',
    adapters: [
        {
            id: 'WarnAdapter',
            params: {
                warnings: [
                    {
                        find: '^assets/minecraft/lang/\\w+.lang$',
                        send: [
                            'You may want to update translations in $0.'
                        ]
                    }
                ]
            }
        }
    ]
}

export default JE16ToJE17
