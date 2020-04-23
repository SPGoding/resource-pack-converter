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

export default class PathAdapter implements Adapter {
    constructor(public readonly params: PathAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        // Rename.
        for (const op of this.params.operations) {
            const targetNid = op.filter.getTargetNid(input.loc, op.set)
            if (targetNid) {
                input.loc.nid = targetNid
                logger.info(`Moved to '${input.loc.type} | ${input.loc.ext} | ${input.loc.nid}'.`)
            }
        }
        // Change namespaced IDs in files.
        for (const op of this.params.operations) {
            if (input.loc.type === 'blockstates' && op.filter.type === 'models') {
                if (input.value instanceof Buffer) {
                    input.value = JSON.parse(input.value.toString('utf8'))
                }
                changeNidInBlockstate(input.value, op.filter, op.set, logger)
            } else if (input.loc.type === 'models' && (op.filter.type === 'models' || op.filter.type === 'textures')) {
                if (input.value instanceof Buffer) {
                    input.value = JSON.parse(input.value.toString('utf8'))
                }
                changeNidInModel(input.value, op.filter, op.set, logger)
            }
        }
        return input
    }
}
