import Adapter from './adapter'
import { File, replaceWithRegExp, Logger } from '../utils'

export interface PathAdapterParams {
    /**
     * Stores all renaming operations.
     */
    operations: {
        /**
         * Specifies the files which this operation should handle. Should be an Regular Expression.
         */
        find: string | string[],
        /**
         * Specifies the new path.
         */
        moveTo: string
    }[]
}

export default class PathAdapter implements Adapter {
    constructor(private readonly params: PathAdapterParams) { }

    async execute(input: File, logger: Logger): Promise<File> {
        for (const op of this.params.operations) {
            if (typeof op.find === 'string') {
                op.find = [op.find]
            }
            for (const i of op.find) {
                const regex = new RegExp(i)
                const path = replaceWithRegExp(op.moveTo, input.path, regex)
                if (path) {
                    logger.info(`Moved to '{outDir}/${path}'.`)
                    return {
                        content: input.content,
                        path
                    }
                }
            }
        }
        return input
    }
}
