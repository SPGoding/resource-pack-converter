import Adapter from '../adapter'
import ResourceFilter from '../../utils/resource-filter'
import Logger from '../../utils/logger'
import { Resource } from '../../utils/utils'

export interface PathAdapterParams {
    /**
     * Stores all renaming operations.
     */
    operations: {
        /**
         * A file filter.
         */
        filter: ResourceFilter,
        /**
         * Specifies the new namespaced ID.
         */
        set: string
    }[]
}

export default class PathAdapter implements Adapter {
    constructor(private readonly params: PathAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        for (const op of this.params.operations) {
            const path = op.filter.getTargetPath(input.path, op.set)
            if (path) {
                logger.info(`Moved to '{outDir}/${path}'.`)
                return { content: input.content, path }
            }
        }
        return input
    }
}
