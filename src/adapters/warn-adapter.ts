import Adapter from './adapter'
import { File, Logger, replaceWithRegExp } from '../utils'

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

export class WarnAdapter implements Adapter {
    constructor(private readonly params: WarnAdapterParams) { }

    async execute(input: File, logger: Logger): Promise<File> {
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
