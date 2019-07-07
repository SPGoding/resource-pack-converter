import Adapter from '../Adapter'
import Blockstate from '../../utils/Blockstate'
import Logger from '../../utils/Logger'
import Model from '../../utils/Model'
import Resource from '../../utils/Resource'
import ResourceFilter from '../../utils/ResourceFilter'
import { getNidFromRel, changeNidInBlockstate, changeNidInModel } from '../../utils/utils'

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
            const path = op.filter.getTargetRel(input.path, op.set)
            if (path) {
                logger.info(`Moved to '{outDir}/${path}'.`)
                input.path = path
            }
        }
        // Change namespaced IDs in files.
        for (const op of this.params.operations) {
            const { type: inputType } = getNidFromRel(input.path, 'json')
            if (inputType === 'blockstates' && op.filter.type === 'models') {
                const bs: Blockstate = JSON.parse(input.content.toString('utf8'))
                const changed = changeNidInBlockstate(bs, op.filter, op.set, logger)
                if (changed) {
                    input.content = Buffer.from(JSON.stringify(bs, undefined, 4), 'utf8')
                }
            } else if (inputType === 'models' && (op.filter.type === 'models' || op.filter.type === 'textures')) {
                const model: Model = JSON.parse(input.content.toString('utf8'))
                const changed = changeNidInModel(model, op.filter, op.set, logger)
                if (changed) {
                    input.content = Buffer.from(JSON.stringify(model, undefined, 4), 'utf8')
                }
            }
        }
        return input
    }
}
