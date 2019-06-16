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
        find: string,
        /**
         * Array of strings.
         */
        send: string[]
    }[]
}

export class WarnAdapter implements Adapter {
    constructor(private readonly params: WarnAdapterParams) { }

    execute(input: File, logger: Logger): File {
        for (const warning of this.params.warnings) {
            const regex = new RegExp(warning.find)
            if (input.path.match(regex)) {
                const messages = warning.send.map(v => replaceWithRegExp(v, input.path, regex))
                logger.warn(...messages)
            }
        }
        return input
    }
}
