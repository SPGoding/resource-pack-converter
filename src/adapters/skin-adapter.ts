import Adapter from './adapter'

import { File, Logger, replaceWithRegExp } from '../utils'
import { Canvas, loadImage } from 'canvas'

export interface SkinAdapterParams {
    /**
     * Specifies the files which this adapter should handle. Should be an Regular Expression.
     */
    find: string,
    /**
     * Adapt type.
     */
    type: 'singleToDouble' | 'doubleToSingle'
}

export default class SkinAdapter implements Adapter {
    constructor(private readonly params: SkinAdapterParams) { }

    async execute(input: File, logger: Logger): Promise<File> {
        const regex = new RegExp(this.params.find)
        const path = replaceWithRegExp('$0', input.path, regex)

        if (path) {
            if (this.params.type === 'singleToDouble') {
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
                const img = await loadImage(input.content)
                const length = img.width
                const canvas = new Canvas(length, length / 2)
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0)
                input.content = canvas.toBuffer('image/png')

                logger.info('Removed second layer for skin.')
                return input
            }
        } else {
            return input
        }
    }
}
