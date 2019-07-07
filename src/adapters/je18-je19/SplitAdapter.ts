import Adapter from '../Adapter'

import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import ResourceFilter from '../../utils/ResourceFilter'
import { Canvas, loadImage } from 'canvas'
import { changeTextureNidInModel } from '../../utils/utils'

export interface SplitAdapterParams {
    textureFilter: ResourceFilter,
    modelFilter: ResourceFilter,
    textureNidPrefix: string,
    count: number
}

export default class SplitAdapter extends Adapter {
    constructor(private readonly params: SplitAdapterParams) { super() }

    async execute(input: Resource, logger: Logger): Promise<Resource | Resource[]> {
        if (this.params.textureFilter.testLoc(input.loc)) {
            const img = input.value =
                input.value || await loadImage(input.buffer)
            const ans: Resource[] = []
            const length = img.width
            const canvas = new Canvas(length, length)
            for (let i = 0; i < this.params.count; i++) {
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, i * length, length, length, 0, 0, length, length)
                ans.push({
                    buffer: canvas.toBuffer('image/png'),
                    loc: {
                        type: input.loc.type,
                        ext: input.loc.ext,
                        nid: `${input.loc.nid}_${i < 10 ? `0${i}` : i}`
                    }
                })
            }
            logger.info(`Splitted to ${this.params.count} textures.`)
            return ans
        } else if (this.params.modelFilter.testLoc(input.loc)) {
            const ans: Resource[] = []
            input.value = input.value || JSON.parse(input.buffer.toString('utf8'))
            delete input.value.parent
            for (let i = 0; i < this.params.count; i++) {
                const suffix = i < 10 ? `0${i}` : i
                const textureNid = `${this.params.textureNidPrefix}_${suffix}`
                const modelNid = `${input.loc.nid}_${suffix}`
                changeTextureNidInModel(input.value, this.params.textureFilter, textureNid, logger)
                ans.push({
                    buffer: input.buffer,
                    value: input.value,
                    loc: {
                        type: input.loc.type,
                        ext: input.loc.ext,
                        nid: modelNid
                    }
                })
            }
            logger.info(`Splitted to ${this.params.count} textures.`)
            return ans
        } else {
            return input
        }
    }
}
