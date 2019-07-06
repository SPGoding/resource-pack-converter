import Adapter from '../Adapter'
import Blockstate from '../../utils/Blockstate'
import Logger from '../../utils/Logger'
import Model from '../../utils/Model'
import Resource from '../../utils/Resource'
import ResourceFilter from '../../utils/ResourceFilter'
import { getNidFromRel } from '../../utils/utils'
import { Direction } from '../../utils/Model'

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
                let changed = false
                if (bs.multipart) {
                    for (let i = 0; i < bs.multipart.length; i++) {
                        const part = bs.multipart[i]
                        if (part.apply instanceof Array) {
                            for (let j = 0; j < part.apply.length; j++) {
                                const apply = part.apply[j]
                                if (op.filter.testNid(apply.model)) {
                                    changed = true
                                    logger.info(`Updated 'multipart[${i}].apply[${j}].model' from '${apply.model}' to '${op.set}'.`)
                                    apply.model = op.set
                                }
                            }
                        } else {
                            if (op.filter.testNid(part.apply.model)) {
                                changed = true
                                logger.info(`Updated 'multipart[${i}].apply.model' from '${part.apply.model}' to '${op.set}'.`)
                                part.apply.model = op.set
                            }
                        }
                    }
                } else if (bs.variants) {
                    for (const key in bs.variants) {
                        const variant = bs.variants[key]
                        if (variant instanceof Array) {
                            for (let i = 0; i < variant.length; i++) {
                                const model = variant[i]
                                if (op.filter.testNid(model.model)) {
                                    changed = true
                                    logger.info(`Updated 'variants[${i}].model' from '${model.model}' to '${op.set}'.`)
                                    model.model = op.set
                                }
                            }
                        } else {
                            if (op.filter.testNid(variant.model)) {
                                changed = true
                                logger.info(`Updated 'variant.model' from '${variant.model}' to '${op.set}'.`)
                                variant.model = op.set
                            }
                        }
                    }
                }
                if (changed) {
                    input.content = Buffer.from(JSON.stringify(bs, undefined, 4), 'utf8')
                }
            } else if (inputType === 'models' && (op.filter.type === 'models')) {
                const model: Model = JSON.parse(input.content.toString('utf8'))
                let changed = false
                if (model.parent) {
                    const value = model.parent
                    if (op.filter.testNid(value)) {
                        changed = true
                        logger.info(`Updated 'model.parent' from '${value}' to '${op.set}'.`)
                        model.parent = op.set
                    }
                }
                if (model.overrides) {
                    for (let i = 0; i < model.overrides.length; i++) {
                        const override = model.overrides[i]
                        const value = override.model
                        if (value) {
                            if (op.filter.testNid(value)) {
                                changed = true
                                logger.info(`Updated 'overrides[${i}].model' from '${value}' to '${op.set}'.`)
                                override.model = op.set
                            }
                        }
                    }
                }
                if (changed) {
                    input.content = Buffer.from(JSON.stringify(model, undefined, 4), 'utf8')
                }
            } else if (inputType === 'models' && op.filter.type === 'textures') {
                const model: Model = JSON.parse(input.content.toString('utf8'))
                let changed = false
                if (model.textures) {
                    for (const variable in model.textures) {
                        const value = model.textures[variable]
                        if (op.filter.testNid(value)) {
                            changed = true
                            logger.info(`Updated 'textures.${variable}' from '${value}' to '${op.set}'.`)
                            model.textures[variable] = op.set
                        }
                    }
                }
                if (model.elements) {
                    for (let i = 0; i < model.elements.length; i++) {
                        const element = model.elements[i]
                        if (element.faces) {
                            for (const direction in element.faces) {
                                const face = element.faces[(direction as Direction)]
                                const value = face.texture
                                if (value) {
                                    if (op.filter.testNid(value)) {
                                        logger.info(`Updated 'elements[${i}].faces.texture' from '${value}' to '${op.set}'.`)
                                        changed = true
                                    }
                                }
                            }
                        }
                    }
                }
                if (changed) {
                    input.content = Buffer.from(JSON.stringify(model, undefined, 4), 'utf8')
                }
            }
        }
        return input
    }
}
