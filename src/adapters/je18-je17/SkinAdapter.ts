import Adapter from '../Adapter'

import { replaceWithRegExp } from '../../utils/utils'
import { Resource } from '../../utils/Resource'
import Logger from '../../utils/Logger'
import { Canvas, loadImage } from 'canvas'

export interface SkinAdapterParams {
    /**
     * Specifies the files which this adapter should handle. Should be an Regular Expression.
     */
    find: RegExp
}

export default class SkinAdapter extends Adapter {
    constructor(private readonly params: SkinAdapterParams) { super() }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        const regex = this.params.find
        const path = replaceWithRegExp('$0', input.path, regex)

        if (path) {
            const img = await loadImage(input.content)
            const length = img.width
            const canvas = new Canvas(length, length / 2)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            input.content = canvas.toBuffer('image/png')

            logger.info('Removed second layer for skin.')
            return input
        } else {
            return input
        }
    }
}
