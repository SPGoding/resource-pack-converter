import Adapter from '../Adapter'

import Resource from '../../utils/Resource'
import PackMcmeta from '../../utils/PackMcmeta'
import Logger from '../../utils/Logger'

export interface PackMcmetaAdapterParams {
    /**
     * Change `pack.pack_format` to specific value.
     */
    changeFormatTo: number
}

export default class PackMcmetaAdapter implements Adapter {
    constructor(public readonly params: PackMcmetaAdapterParams) { }

    async execute(input: Resource, logger: Logger): Promise<Resource> {
        if (input.loc.type === '?' && input.loc.nid === 'pack.mcmeta') {
            if (input.value instanceof Buffer) {
                input.value = JSON.parse(input.value.toString('utf8'))
            }
            const obj: PackMcmeta = input.value
            obj['$resource-pack-converter'] = {
                info: 'This resource pack is converted by resource-pack-converter',
                github: 'https://github.com/SPGoding/resource-pack-converter'
            }
            const oldFormat = obj.pack ? obj.pack.pack_format : undefined
            const targetFormat = this.params.changeFormatTo
            if (oldFormat !== targetFormat) {
                logger.info(`Changed 'pack.pack_format' from '${oldFormat}' to '${targetFormat}'.`)
                if (obj.pack) {
                    obj.pack.pack_format = targetFormat
                } else {
                    obj.pack = { pack_format: targetFormat, description: '' }
                }
            }
            return input
        } else {
            return input
        }
    }
}
