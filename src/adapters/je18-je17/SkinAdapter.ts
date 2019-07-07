import Adapter from '../Adapter'

import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import ResourceFilter from '../../utils/ResourceFilter'
import { Canvas, loadImage } from 'canvas'

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
            const canvas = new Canvas(length, length / 2)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            input.buffer = canvas.toBuffer('image/png')
            delete input.interpreted

            logger.info('Removed second layer for skin.')
            return input
        } else {
            return input
        }
    }
}
