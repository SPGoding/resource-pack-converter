import * as path from 'path'
import * as fs from 'fs-extra'
import { File, Conversion, Logger } from './utils'
import Adapter, { Adapters } from './adapters/adapter'

export interface ConverterOptions {
    outDir: string,
    conversion: Conversion
}

export async function convert(src: string, options: ConverterOptions): Promise<Logger> {
    const logger = new Logger()

    try {
        logger.info(`Duplicating '${path.join(src)}' to '${path.join(options.outDir)}'.`)
        await fs.copy(src, options.outDir, { recursive: true })
        logger.info(`Duplicated '${path.join(src)}' to '${path.join(options.outDir)}'.`)

        logger.info('Initializing all adapters.')
        const adapters: Adapter[] = options.conversion.adapters.map(adapterInit => {
            for (const adapter of Adapters) {
                if (adapter.name === adapterInit.id) {
                    logger.info(`Initialized adapter ${adapter.name}${JSON.stringify(adapterInit.params)}.`)
                    return new adapter(adapterInit.params)
                }
            }
        })
        logger.info('Initialized all adapters.')

        convertRecursively(options.outDir, options.outDir, adapters, logger)
    } catch (ex) {
        logger.error(ex)
    } finally {
        return logger
    }
}

async function convertRecursively(root: string, dir: string, adapters: Adapter[], logger: Logger) {
    const files = await fs.readdir(dir)

    files.forEach(async v => {
        const filePath = path.join(dir, v).replace(path.join(root), '').replace(/\\/g, '/')

        if ((await fs.stat(path.join(dir, v))).isDirectory()) {
            logger.info(`Loading '${filePath}'.`)
            convertRecursively(root, path.join(dir, v), adapters, logger)
            logger.info(`Loaded '${filePath}'.`)
        } else {
            const content = await fs.readFile(path.join(dir, v))
            const file: File = { content, path: filePath }
            convertSingleFile(file, adapters, logger)
        }
    })
}

async function convertSingleFile(file: File, adapters: Adapter[], logger: Logger) {
    logger.info(`Adapting '${file.path}'.`)

    for (const adapter of adapters) {
        logger.info(`Executing '${adapter.constructor.name}'.`)
        file = await adapter.execute(file, logger)
        logger.info(`Executed '${adapter.constructor.name}'.`)
    }

    logger.info(`Adapted '${file.path}'.`)
    return file
}

export default convert
