import Adapter from '../adapter'

import { Resource } from '../../utils/utils'
import Logger from '../../utils/logger'
import { Canvas, loadImage } from 'canvas'

export default class ClockCompassAdapter implements Adapter {
    constructor() { }

    async execute(input: Resource, logger: Logger): Promise<Resource | Resource[]> {
        const result = await this.handle(input, logger, 'clock')
        if (result instanceof Array) {
            return result
        } else {
            return this.handle(input, logger, 'compass')
        }
    }

    private async handle(input: Resource, logger: Logger, name: 'clock' | 'compass') {
        if (input.path === `assets/minecraft/textures/items/${name}.png`) {
            const resources: Resource[] = []
            const img = await loadImage(input.content)
            const length = img.width
            const canvas = new Canvas(length, length)
            const count = img.height / length
            for (let i = 0; i < count; i++) {
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, i * length, length, length, 0, 0, length, length)
                resources.push({
                    content: canvas.toBuffer('image/png'),
                    path: `assets/minecraft/textures/items/${name}_${i < 10 ? `0${i}` : i}.png`
                })
            }
            logger.info('Split to multiple textures.')
            return resources
        } else {
            return input
        }
    }
}
