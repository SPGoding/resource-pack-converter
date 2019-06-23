import Adapter from '../adapter'
import { Resource, replaceWithRegExp } from '../../utils/utils'
import Logger from '../../utils/logger'

export interface WarnAdapterParams {
    /**
     * Stores all warnings.
     */
    warnings: {
        /**
         * The warnings will be sent if specific files exist. Should be an 
         * Regular Expression.
         */
        find: string | string[],
        /**
         * Array of strings.
         */
        send: string[]
    }[]
}

export default class WarnAdapter implements Adapter {
    constructor(private readonly params: WarnAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        for (const warning of this.params.warnings) {
            if (typeof warning.find === 'string') {
                warning.find = [warning.find]
            }
            for (const i of warning.find) {
                const regex = new RegExp(i)
                if (input.path.match(regex)) {
                    const messages = warning.send.map(v => replaceWithRegExp(v, input.path, regex))
                    logger.warn(...messages)
                }
            }
        }
        return input
    }
}
