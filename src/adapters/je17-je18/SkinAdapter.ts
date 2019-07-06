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

export default class SkinAdapter implements Adapter {
    constructor(private readonly params: SkinAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        const regex = this.params.find
        const path = replaceWithRegExp('$0', input.path, regex)

        if (path) {
            const img = await loadImage(input.content)
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
            input.content = canvas.toBuffer('image/png')

            logger.info('Added second layer for skin.')
            return input
        } else {
            return input
        }
    }
}
