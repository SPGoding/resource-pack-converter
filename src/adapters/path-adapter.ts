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
        find: string,
        /**
         * Specifies the new path.
         */
        moveTo: string
    }[]
}

export class PathAdapter implements Adapter {
    constructor(private readonly params: PathAdapterParams) { }

    execute(input: File, logger: Logger): File {
        for (const op of this.params.operations) {
            const regex = new RegExp(op.find)
            const path = replaceWithRegExp(op.moveTo, input.path, regex)
            if (path) {
                logger.info(`Moved '{inDir}/${input.path}' to '{outDir}/${path}'.`)
                return {
                    content: input.content,
                    path
                }
            }
        }
        return input
    }
}
