import Adapter from '../Adapter'

import { Resource } from '../../utils/Resource'
import { PackMcmeta } from '../../utils/PackMcmeta'
import Logger from '../../utils/Logger'

export interface PackMcmetaAdapterParams {
    /**
     * Change `pack.pack_format` to specific value.
     */
    changeFormatTo: number
}

export default class PackMcmetaAdapter extends Adapter {
    constructor(private readonly params: PackMcmetaAdapterParams) { super() }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        if (input.path === 'pack.mcmeta') {
            const obj: PackMcmeta = JSON.parse(input.content.toString('utf8'))
            obj['$resource-pack-converter'] = {
                info: 'This resource pack is converted by resource-pack-converter',
                github: 'https://github.com/SPGoding/resource-pack-converter'
            }
            const oldFormat = obj.pack ? obj.pack.pack_format : undefined
            const targetFormat = this.params.changeFormatTo
            if (oldFormat !== targetFormat) {
                logger.info(`Changed pack.pack_format from '${oldFormat}' to '${targetFormat}'.`)
                if (obj.pack) {
                    obj.pack.pack_format = targetFormat
                } else {
                    obj.pack = { pack_format: targetFormat, description: '' }
                }
            }
            input.content = Buffer.from(JSON.stringify(obj, undefined, 4), 'utf8')
            return input
        } else {
            return input
        }
    }
}
