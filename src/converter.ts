import * as path from 'path'
import * as fs from 'fs-extra'
import Adapter from './adapters/adapter'
import { Resource, getRelFromAbs, getNamespacedID } from './utils/utils'
import { Logger } from './utils/logger'
import { Conversion } from './conversions/conversion'

/**
 * The options for converter.
 */
export interface ConverterOptions {
    /**
     * Redirects output files to the directory.
     */
    outDir: string,
    /**
     * Specifies the *conversion* to use.
     */
    conversion: Conversion
}

/**
 * Converts the input resource pack folder.
 * @param src The path of input resource pack folder.
 * @param options The options.
 */
export async function convert(src: string, options: ConverterOptions) {
    const inDir = path.resolve(src)
    const outDir = path.resolve(options.outDir)
    const logger = new Logger()
    const conversion = options.conversion

    logger.info('Resouce Pack Converter made by @SPGoding <SPGoding@outlook.com>.')
    logger.info('Starting conversion...')
    logger.prvc(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`)

    try {
        const adapters = conversion.adapters
        logger.info(`Initialized ${adapters.length} adapter(s).`)

        await convertRecursively(inDir, inDir, { outDir, adapters, logger })
        logger.info('Finished conversion.')
    } catch (ex) {
        logger.error(ex)
    } finally {
        return logger
    }
}

async function convertRecursively(root: string, inDir: string, options: { outDir: string, adapters: Adapter[], logger: Logger }) {
    const { logger } = options
    try {
        const directories = await fs.readdir(inDir)

        for (const i of directories) {
            const absInPath = path.join(inDir, i)
            const relPath = getRelFromAbs(root, absInPath)

            if ((await fs.stat(absInPath)).isDirectory()) {
                logger.info(`Handling directory '{inDir}/${relPath}'...`).indent()
                await convertRecursively(root, absInPath, options)
                logger.indent(-1)
            } else {
                logger.info(`Handling file '{inDir}/${relPath}'...`).indent()
                const content = await fs.readFile(absInPath)
                const resource = { content, path: relPath }
                await convertSingleFile(resource, options)
                logger.indent(-1)
            }
        }
    } catch (ex) {
        logger.error(ex)
    }
}

async function convertSingleFile(resource: Resource, options: { outDir: string, adapters: Adapter[], logger: Logger }) {
    const { outDir, adapters, logger } = options
    try {
        for (const adapter of adapters) {
            resource = await adapter.execute(resource, logger)
        }

        const absPath = path.join(outDir, path.dirname(resource.path))
        if (!fs.existsSync(absPath)) {
            fs.mkdirSync(absPath, { recursive: true })
        }
        await fs.writeFile(path.join(outDir, resource.path), resource.content)
        logger.info(`Created file '{outDir}/${resource.path}'.`)

    } catch (ex) {
        logger.error(ex)
    }
}

export default convert
