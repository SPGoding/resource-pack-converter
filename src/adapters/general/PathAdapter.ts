import Adapter from '../Adapter'
import ResourceFilter from '../../utils/ResourceFilter'
import Logger from '../../utils/Logger'
import { getNid } from '../../utils/utils'
import { Resource } from '../../utils/Resource'

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

export default class PathAdapter extends Adapter {
    constructor(private readonly params: PathAdapterParams) { super() }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        // Move files.
        for (const op of this.params.operations) {
            const path = op.filter.getTargetPath(input.path, op.set)
            if (path) {
                logger.info(`Moved to '{outDir}/${path}'.`)
                input = { content: input.content, path }
            }
        }
        // Change namespaced IDs in files.
        for (const op of this.params.operations) {
            const { type: inputType } = getNid(input.path, 'json')
            if (inputType === 'blockstates' && op.filter.type === 'models') {

            } else if (inputType === 'models' && (op.filter.type === 'models' || op.filter.type === 'textures')) {

            }
        }
        return input
    }
}
