import Adapter from '../Adapter'

import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import ResourceFilter from '../../utils/ResourceFilter'
import { Canvas, loadImage, Image } from 'canvas'

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
            const canvas = new Canvas(length, length / 2)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            input.value = canvas.toBuffer('image/png')
            delete input.value

            logger.info('Removed second layer for skin.')
            return input
        } else {
            return input
        }
    }
}
