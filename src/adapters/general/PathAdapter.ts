import Adapter from '../Adapter'
import Logger from '../../utils/Logger'
import Resource from '../../utils/Resource'
import ResourceFilter from '../../utils/ResourceFilter'
import { changeNidInBlockstate, changeNidInModel } from '../../utils/utils'

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
        // Rename.
        for (const op of this.params.operations) {
            const targetNid = op.filter.getTargetNid(input.loc, op.set)
            if (targetNid) {
                logger.info(`Renamed to '${targetNid}'.`)
                input.loc.nid = targetNid
            }
        }
        // Change namespaced IDs in files.
        for (const op of this.params.operations) {
            if (input.loc.type === 'blockstates' && op.filter.type === 'models') {
                input.interpreted = input.interpreted || JSON.parse(input.buffer.toString('utf8'))
                changeNidInBlockstate(input.interpreted, op.filter, op.set, logger)
            } else if (input.loc.type === 'models' && (op.filter.type === 'models' || op.filter.type === 'textures')) {
                input.interpreted = input.interpreted || JSON.parse(input.buffer.toString('utf8'))
                changeNidInModel(input.interpreted, op.filter, op.set, logger)
            }
        }
        return input
    }
}
