import Adapter from '../adapter'

import { Resource, replaceWithRegExp } from '../../utils/utils'
import Logger from '../../utils/logger'
import { Canvas, loadImage } from 'canvas'

export interface ClockAdapterParams { }

export default class ClockAdapter implements Adapter {
    constructor(private readonly params: ClockAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource | Resource[]> {
        if (input.path === 'assets/minecraft/textures/items/clock.png') {
            const resources: Resource[] = []
            const img = await loadImage(input.content)
            const length = img.width
            const canvas = new Canvas(length, length)
            const count = img.height / length
            for (let i = 0; i < count; i++) {
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, i * length, length, length, 0, 0, length, length)
                resources.push({ content: canvas.toBuffer('image/png'), path: `assets/minecraft/textures/items/clock_${i}.png` })
            }
            return resources
        } else {
            return input
        }
    }
}
