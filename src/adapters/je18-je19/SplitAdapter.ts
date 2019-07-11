import Adapter from '../Adapter'

import Logger from '../../utils/Logger'
import Resource from '../../utils/Resource'
import ResourceFilter from '../../utils/ResourceFilter'
import { changeTextureNidInModel } from '../../utils/utils'
import { Canvas, loadImage, Image } from 'canvas'

export interface SplitAdapterParams {
    textureFilter: ResourceFilter,
    modelFilter: ResourceFilter,
    textureNidPrefix: string,
    count: number
}

export default class SplitAdapter implements Adapter {
    constructor(public readonly params: SplitAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource | Resource[]> {
        if (this.params.textureFilter.testLoc(input.loc)) {
            if (input.value instanceof Buffer) {
                input.value = await loadImage(input.value)
            }
            const img: Image = input.value
            const ans: Resource[] = []
            const length = img.width
            for (let i = 0; i < this.params.count; i++) {
                const canvas = new Canvas(length, length)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, i * length, length, length, 0, 0, length, length)
                ans.push({
                    value: canvas.toBuffer('image/png'),
                    loc: {
                        type: input.loc.type,
                        ext: input.loc.ext,
                        nid: `${input.loc.nid}_${i < 10 ? `0${i}` : i}`
                    }
                })
            }
            logger.info(`Splitted to ${ans.length} textures.`)
            return ans
        } else if (this.params.modelFilter.testLoc(input.loc)) {
            const ans: Resource[] = []
            if (input.value instanceof Buffer) {
                input.value = JSON.parse(input.value.toString('utf8'))
            }
            delete input.value.parent
            for (let i = 0; i < this.params.count; i++) {
                const suffix = i < 10 ? `0${i}` : i
                const textureNid = `${this.params.textureNidPrefix}_${suffix}`
                const modelNid = `${input.loc.nid}_${suffix}`
                changeTextureNidInModel(input.value, this.params.textureFilter, textureNid, logger)
                ans.push({
                    value: input.value,
                    loc: {
                        type: input.loc.type,
                        ext: input.loc.ext,
                        nid: modelNid
                    }
                })
            }
            logger.info(`Splitted to ${ans.length} models.`)
            return ans
        } else {
            return input
        }
    }
}
