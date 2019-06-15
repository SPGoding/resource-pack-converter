import Adapter from './adapter'
import { File, replaceWithRegExp, Logger } from '../utils'

export interface MoveAdapterParams {
    /**
     * Stores all renaming operations.
     */
    operations: {
        /**
         * Specifies the files which this operation should handle. Should be an Regular Expression.
         * File extensions like `.png` and `.png.mcmeta` should be omitted.
         */
        find: string,
        /**
         * Specifies the new path.
         */
        moveTo: string
    }[]
}

export class MoveAdapter implements Adapter {
    constructor(private readonly params: MoveAdapterParams) { }

    async execute(input: File, logger: Logger): Promise<File> {
        for (const op of this.params.operations) {
            const regex = new RegExp(op.find)
            const path = replaceWithRegExp(op.moveTo, input.path, regex)
            if (path) {
                logger.info(`Moved '${path}' to '${path}'.`)
                return {
                    content: input.content,
                    path
                }
            }
        }
        return input
    }
}
