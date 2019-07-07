import Adapter from '../Adapter'

import { replaceWithRegExp } from '../../utils/utils'
import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import { Canvas, loadImage } from 'canvas'
import ResourceFilter from '../../utils/ResourceFilter'

export interface SkinAdapterParams {
    /**
     * An resource filter.
     */
    filter: ResourceFilter
}

export default class SkinAdapter extends Adapter {
    constructor(private readonly params: SkinAdapterParams) { super() }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        if (this.params.filter.testLoc(input.loc)) {
            const img = input.interpreted =
                input.interpreted || await loadImage(input.buffer)
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
            input.buffer = canvas.toBuffer('image/png')
            delete input.interpreted

            logger.info('Added second layer for skin.')
            return input
        } else {
            return input
        }
    }
}
