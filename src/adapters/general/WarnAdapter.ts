import Adapter from '../Adapter'
import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import ResourceFilter from '../../utils/ResourceFilter'
import { replaceWithRegExp, getRelFromLoc } from '../../utils/utils'

export interface WarnAdapterParams {
    /**
     * Stores all warnings.
     */
    warnings: {
        /**
         * The warnings will be sent if specific files exist. Should be an 
         * Regular Expression.
         * @deprecated
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
    constructor(public readonly params: WarnAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        for (const warning of this.params.warnings) {
            if (warning.find instanceof RegExp) {
                warning.find = [warning.find]
            }
            if (warning.find) {
                for (const i of warning.find) {
                    if (getRelFromLoc(input.loc).match(i)) {
                        const messages = warning.send.map(v => replaceWithRegExp(v, getRelFromLoc(input.loc), i))
                        logger.warn(...messages)
                    }
                }
            } else if (warning.filter) {
                if (warning.filter.testLoc(input.loc)) {
                    logger.warn(...warning.send)
                }
            } else {
                throw "Expected 'find' or 'filter' but got nothing."
            }
        }
        return input
    }
}
