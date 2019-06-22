import Adapter from '../adapter'

import { File, Logger, replaceWithRegExp } from '../../utils'
import { Canvas, loadImage } from 'canvas'

export interface SkinAdapterParams {
    /**
     * Specifies the files which this adapter should handle. Should be an Regular Expression.
     */
    find: string
}

export default class SkinAdapter implements Adapter {
    constructor(private readonly params: SkinAdapterParams) { }

    async execute(input: File, logger: Logger): Promise<File> {
        const regex = new RegExp(this.params.find)
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
