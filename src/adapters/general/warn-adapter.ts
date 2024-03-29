import Adapter from '../adapter'
import { Resource, replaceWithRegExp } from '../../utils/utils'
import Logger from '../../utils/logger'
import ResourceFilter from '../../utils/resource-filter';

export interface WarnAdapterParams {
    /**
     * Stores all warnings.
     */
    warnings: {
        /**
         * The warnings will be sent if specific files exist. Should be an 
         * Regular Expression.
         */
        find?: RegExp | RegExp[],
        /**
         * The warnings will be sent if the filter passes.
         */
        filter?: ResourceFilter
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
            if (warning.find instanceof RegExp) {
                warning.find = [warning.find]
            }
            if (warning.find) {
                for (const i of warning.find) {
                    const regex = i
                    if (input.path.match(regex)) {
                        const messages = warning.send.map(v => replaceWithRegExp(v, input.path, regex))
                        logger.warn(...messages)
                    }
                }
            } else if (warning.filter) {
                if (warning.filter.testPath(input.path)) {
                    logger.warn(...warning.send)
                }
            } else {
                throw "Expected 'find' or 'filter' but got nothing."
            }
        }
        return input
    }
}
