import * as path from 'path'
import * as fs from 'fs-extra'
import Adapter from './adapters/Adapter'
import { getRelativePath, getNid } from './utils/utils'
import { Resource } from './utils/Resource'
import Logger from './utils/Logger'
import { Conversion } from './conversions/Conversion'

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
    logger.dbug(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`)

    logger.dbug('Getting the Whole...').indent()
    const whole = await getWhole(inDir)
    await logger.dbug(`Got the Whole: ${Object.keys(whole.blockstates).length} blockstates and ${Object.keys(whole.models).length} models.`).indent(-1)

    try {
        const adapters: Adapter[] = []
        let [adapterCount, adapterFunctionCount] = [0, 0]
        for (const i of conversion.adapters) {
            if (i instanceof Adapter) {
                adapters.push(i)
                adapterCount += 1
            } else {
                adapters.push(i(whole))
                adapterFunctionCount += 1
            }
        }
        logger.dbug(`Initialized ${adapters.length} (${adapterCount}, ${adapterFunctionCount}) adapter(s).`)

        await convertRecursively(inDir, inDir, { outDir, adapters, logger })
        logger.info('Finished conversion.')
    } catch (ex) {
        logger.error(ex)
    } finally {
        return logger
    }
}

async function getWhole(inDir: string) {
    const recurse = async (dirPrefix: string, dir: string, ans: { blockstates: any, models: any }) => {
        const files = await fs.readdir(dir)
        for (const v of files) {
            if ((await fs.stat(path.join(dir, v))).isDirectory()) {
                await recurse(dirPrefix, path.join(dir, v), ans)
            } else {
                const filePath = path.join(dir, v)
                if (path.dirname(filePath)) {
                    const { nid, type } = getNid(
                        path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/'),
                        '.json'
                    )
                    if (path.extname(v) === '.json' && (type === 'blockstates' || type === 'models')) {
                        const json = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))
                        ans[type][nid] = JSON.stringify({ ...json, $isReplaced: true })
                    }
                }
            }
        }
    }

    const ans = {
        blockstates: {},
        models: {}
    }

    await recurse(inDir, inDir, ans)

    return ans
}

async function convertRecursively(root: string, inDir: string, options: { outDir: string, adapters: Adapter[], logger: Logger }) {
    const { logger } = options
    try {
        const directories = await fs.readdir(inDir)

        for (const i of directories) {
            const absInPath = path.join(inDir, i)
            const relPath = getRelativePath(root, absInPath)

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
    let resources: Resource[] | undefined = undefined
    try {
        for (const adapter of adapters) {
            const result = await adapter.execute(resource, logger)
            if (result instanceof Array) {
                resources = result
                break
            } else {
                resource = result
            }
        }

        if (!resources) {
            resources = [resource]
        }

        for (const i of resources) {
            if (i.path) {
                const absPath = path.join(outDir, path.dirname(i.path))
                if (!fs.existsSync(absPath)) {
                    fs.mkdirSync(absPath, { recursive: true })
                }
                await fs.writeFile(path.join(outDir, i.path), i.content)
                logger.info(`Created file '{outDir}/${i.path}'.`)
            } else {
                logger.info('Removed file.')
            }
        }
    } catch (ex) {
        logger.error(ex)
    }
}

export default convert
