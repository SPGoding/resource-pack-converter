import Adapter from '../Adapter'

import Resource from '../../utils/Resource'
import Logger from '../../utils/Logger'
import { Canvas, loadImage } from 'canvas'

export interface SplitAdapterParams {
    textureRel: string,
    modelRel: string
}

export default class SplitAdapter extends Adapter {
    constructor(private readonly params: SplitAdapterParams) { super() }

    async execute(input: Resource, logger: Logger): Promise<Resource | Resource[]> {
        if (input.path === this.params.textureRel) {
            const ans: Resource[] = []
            const img = await loadImage(input.content)
            const length = img.width
            const canvas = new Canvas(length, length)
            const count = img.height / length
            for (let i = 0; i < count; i++) {
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, i * length, length, length, 0, 0, length, length)
                ans.push({
                    content: canvas.toBuffer('image/png'),
                    path: `assets/minecraft/textures/items/${name}_${i < 10 ? `0${i}` : i}.png`
                })
            }
            logger.info(`Splitted to ${count} textures.`)
            return ans
        } else if (input.path === this.params.modelRel) {
            const ans: Resource[] = []
            const model = JSON.parse(input.content.toString('utf8'))
            delete model.parent
            
            throw ''
        } else {
            return input
        }
    }
}
