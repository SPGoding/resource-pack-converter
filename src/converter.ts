import * as path from 'path'
import * as fs from 'fs-extra'
import Adapter from './adapters/Adapter'
import { getNidFromRel } from './utils/utils'
import Resource from './utils/Resource'
import Logger from './utils/Logger'
import Conversion from './conversions/Conversion'
import Whole from './utils/Whole'

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

    try {
        logger.info('Resouce Pack Converter made by @SPGoding <SPGoding@outlook.com>.')
        logger.dbug(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`)

        logger.dbug('Getting the Whole...').indent()
        const whole = await getWhole(inDir, logger)
        await logger.dbug('Got the Whole.').indent(-1)

        logger.dbug('Initializing adapters...').indent()
        const adapters = getAdapters(whole, options.conversion, logger)
        logger.dbug(`Initialized ${adapters.length} adapter(s).`).indent(-1)

        logger.info('Starting conversion...')
        await convertWhole(whole, adapters, logger)
        logger.info('Finished conversion.')
    } catch (ex) {
        logger.error(ex)
    } finally {
        return logger
    }
}

async function getWhole(inDir: string, logger: Logger) {
    const recurse = async (dirPrefix: string, dir: string, ans: Whole) => {
        const files = await fs.readdir(dir)
        for (const v of files) {
            if ((await fs.stat(path.join(dir, v))).isDirectory()) {
                await recurse(dirPrefix, path.join(dir, v), ans)
            } else {
                const filePath = path.join(dir, v)
                const ext = filePath.slice(filePath.indexOf('.', filePath.lastIndexOf(path.sep)) + 1)
                const { nid, type } = getNidFromRel(
                    path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/'),
                    ext
                )
                const buffer = await fs.readFile(filePath)
                let category = ans[type]
                category = category || {}
                category[nid] = { buffer, ext }
                logger.dbug(`Added '${type} | ${ext} | ${nid}'.`)
            }
        }
    }

    const ans: Whole = {
        blockstates: {},
        lang: {},
        models: {},
        texts: {},
        textures: {},
        '?': {}
    }

    await recurse(inDir, inDir, ans)

    return ans
}

function getAdapters(whole: Whole, conversion: Conversion, logger: Logger) {
    const ans = []
    for (const i of conversion.adapters) {
        if (i instanceof Adapter) {
            logger.dbug(`Initialized ${i.constructor.name}.`)
            ans.push(i)
        } else {
            const result = i(whole)
            if (result instanceof Array) {
                ans.push(...result)
                result.forEach(v => void logger.dbug(`Constructed ${v.constructor.name}.`))
            } else {
                ans.push(result)
                logger.dbug(`Constructed ${result.constructor.name}.`)
            }
        }
    }
    return ans
}

async function convertWhole(whole: Whole, adapters: Adapter[], logger: Logger) {
    for (const type in whole) {
        if (whole.hasOwnProperty(type)) {
            const category = whole[type]
            for (const nid in category) {
                if (category.hasOwnProperty(nid)) {
                    const ele = category[nid]
                    let resource: Resource = {
                        buffer: ele.buffer,
                        value: ele.value,
                        loc: {
                            nid,
                            type,
                            ext: ele.ext
                        }
                    }
                    let resources: Resource[] = []
                    logger.info(`Converting '${type} | ${ele.ext} | ${nid}'...`).indent()
                    for (const adapter of adapters) {
                        const result = await adapter.execute(resource, logger)
                        if (result instanceof Array) {
                            resources.push(...result)
                            break
                        } else {
                            resource = result
                            resources = [result]
                        }
                    }
                    for (const i of resources) {
                        whole[resource.loc.type][resource.loc.nid] = {
                            buffer: i.buffer,
                            value: i.value,
                            ext: i.loc.ext
                        }
                    }
                    logger.info('Succeeded.').indent(-1)
                }
            }
        }
    }
}

export default convert
