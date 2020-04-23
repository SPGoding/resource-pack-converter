import Adapter from '../Adapter'

import { replaceWithRegExp } from '../../utils/utils'
import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import { Canvas, loadImage, Image } from 'canvas'
import ResourceFilter from '../../utils/ResourceFilter'

export interface SkinAdapterParams {
    /**
     * An resource filter.
     */
    filter: ResourceFilter
}

export default class SkinAdapter implements Adapter {
    constructor(public readonly params: SkinAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        if (this.params.filter.testLoc(input.loc)) {
            if (input.value instanceof Buffer) {
                input.value = await loadImage(input.value)
            }
            const img: Image = input.value
            const length = img.width
            const canvas = new Canvas(length, length)
            const slength = length / 4
            const y = length / 4 * 3
            const sx1 = 0
            const sy1 = length / 4
            const x1 = length / 4
            const sx2 = length / 8 * 5
            const sy2 = length / 4
            const x2 = length / 2
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            ctx.drawImage(img, sx1, sy1, slength, slength, x1, y, slength, slength)
            ctx.drawImage(img, sx2, sy2, slength, slength, x2, y, slength, slength)
            input.value = canvas.toBuffer('image/png')
            delete input.value

            logger.info('Added second layer for skin.')
            return input
        } else {
            return input
        }
    }
}
