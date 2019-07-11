import * as path from 'path'
import * as fs from 'fs-extra'
import Adapter from './adapters/Adapter'
import Resource from './utils/Resource'
import Logger from './utils/Logger'
import Conversion from './conversions/Conversion'
import Whole from './utils/Whole'
import { getNidFromRel, getRelFromNid, getRelFromAbs } from './utils/utils'
import { Image } from 'canvas'

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
        const adapters = await getAdapters(whole, options.conversion, logger)
        await logger.dbug(`Initialized ${adapters.length} adapter(s).`).indent(-1)

        logger.info('Starting conversion...').indent()
        await convertWhole(whole, adapters, logger)
        logger.info('Finished conversion.').indent(-1)

        logger.info('Saving the Whole...').indent()
        await saveWhole(whole, outDir, logger)
        logger.info('Saved the Whole.').indent(-1)
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
                const rel = path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/')
                const { nid, type } = getNidFromRel(
                    rel,
                    ext
                )
                const buffer = await fs.readFile(filePath)
                const category = ans[type] || (ans[type] = {})
                const extObject = category[ext] || (category[ext] = {})
                extObject[nid] = buffer
                logger.dbug(`Added '{inDir}/${rel}' as '${type} | ${ext} | ${nid}'.`)
            }
        }
    }

    const ans: Whole = {
        blockstates: { json: {} },
        lang: {},
        models: { json: {} },
        texts: {},
        textures: { png: {}, 'png.mcmeta': {} },
        '?': {}
    }

    await recurse(inDir, inDir, ans)

    return ans
}

async function getAdapters(whole: Whole, conversion: Conversion, logger: Logger) {
    const ans: Adapter[] = []
    function addAdapter(op: 'Initialized' | 'Constructed', adapter: Adapter, array: Adapter[]) {
        array.push(adapter)
        if (op === 'Initialized') {
            logger.dbug(`${op} ${adapter.constructor.name}`)
        } else {
            logger.dbug(`${op} ${adapter.constructor.name} with ${JSON.stringify(adapter.params)}`)
        }
    }

    for (const i of conversion.adapters) {
        if (i instanceof Function) {
            const result = i(whole)
            if (result instanceof Array) {
                result.forEach(v => addAdapter('Constructed', v, ans))
            } else if (result instanceof Promise) {
                const resolve = await result
                if (resolve instanceof Array) {
                    resolve.forEach(v => addAdapter('Constructed', v, ans))
                } else {
                    addAdapter('Constructed', resolve, ans)
                }
            } else {
                addAdapter('Constructed', result, ans)
            }
        } else {
            addAdapter('Initialized', i, ans)
        }
    }
    return ans
}

async function convertWhole(whole: Whole, adapters: Adapter[], logger: Logger) {
    for (const type in whole) {
        if (whole.hasOwnProperty(type)) {
            const category = whole[type]
            for (const ext in category) {
                if (category.hasOwnProperty(ext)) {
                    const extObject = category[ext]
                    for (const nid in extObject) {
                        if (extObject.hasOwnProperty(nid)) {
                            const value = extObject[nid]
                            let input: Resource = { value, loc: { nid, type, ext } }
                            let resources: Resource[] = []
                            logger.info(`Converting '${type} | ${ext} | ${nid}'...`).indent()
                            for (const adapter of adapters) {
                                const result = await adapter.execute(input, logger)
                                if (result instanceof Array) {
                                    resources.push(...result)
                                    break
                                } else {
                                    input = result
                                    resources = [result]
                                }
                            }
                            for (const i of resources) {
                                whole[input.loc.type][input.loc.ext][input.loc.nid] = i.value
                            }
                            logger.info('Succeeded.').indent(-1)
                        }
                    }
                }
            }
        }
    }
}

async function saveWhole(whole: Whole, outDir: string, logger: Logger) {
    logger.info(whole)
    for (const type in whole) {
        if (whole.hasOwnProperty(type)) {
            const category = whole[type]
            for (const ext in category) {
                if (category.hasOwnProperty(ext)) {
                    const extObject = category[ext]
                    for (const nid in extObject) {
                        if (extObject.hasOwnProperty(nid)) {
                            const value = extObject[nid]
                            const rel = getRelFromNid(nid, type, ext)
                            const abs = path.join(outDir, rel)
                            const dir = path.dirname(abs)
                            if (typeof value === 'string') {
                                extObject[nid] = Buffer.from(value, 'utf8')
                            } else if (value instanceof Image) {
                                extObject[nid] = value.src as Buffer
                            } else if (value instanceof Object) {
                                extObject[nid] = Buffer.from(JSON.stringify(value, undefined, 4), 'utf8')
                            }
                            if (!await fs.pathExists(dir)) {
                                fs.mkdirSync(dir, { recursive: true })
                            }
                            await fs.writeFile(abs, extObject[nid])
                            logger.dbug(`Saved '${type} | ${ext} | ${nid}' to '{outDir}/${rel}'`)
                        }
                    }
                }
            }
        }
    }
}

export default convert
