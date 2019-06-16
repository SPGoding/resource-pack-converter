import Adapter from './adapter'

import { File, Logger, replaceWithRegExp } from '../utils'
import { Canvas, loadImage } from 'canvas'

export interface SkinAdapterParams {
    /**
     * Specifies the files which this adapter should handle. Should be an Regular Expression.
     */
    find: string,
    /**
     * Specifies the new path.
     */
    moveTo: string
}

export class SkinAdapter implements Adapter {
    constructor(private readonly params: SkinAdapterParams) { }

    async execute(input: File, logger: Logger): Promise<File> {
        const regex = new RegExp(this.params.find)
        const path = replaceWithRegExp('$0', input.path, regex)

        if (path) {
            const img = await loadImage(input.content)
            const width = img.width
            const height = img.width * 2
            const canvas = new Canvas(width, height)
            const ctx = canvas.getContext('2d')

            logger.info(`Added second layer for skin '{inDir}/${path}'.`)
        }

        return input
    }
}
