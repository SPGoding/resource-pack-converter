import * as fs from 'fs-extra'
import * as path from 'path'
import { getNid, Version } from '../utils/utils'
import JE18 from './je1.8'
import JE19 from './je1.9'
import JE110 from './je1.10'
import JE111 from './je1.11'
import JE112 from './je1.12'
import JE113 from './je1.13'
import JE114 from './je1.14'

export async function getWhole(inDir: string, version: Version) {
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

    const customWhole = {
        blockstates: {},
        models: {}
    }

    await recurse(inDir, inDir, customWhole)

    let vanillaWhole: any
    if (version === 'JE1.8') {
        vanillaWhole = JE18
    } else if (version === 'JE1.9') {
        vanillaWhole = JE19
    } else if (version === 'JE1.10') {
        vanillaWhole = JE110
    } else if (version === 'JE1.11') {
        vanillaWhole = JE111
    } else if (version === 'JE1.12') {
        vanillaWhole = JE112
    } else if (version === 'JE1.13') {
        vanillaWhole = JE113
    } else if (version === 'JE1.14') {
        vanillaWhole = JE114
    } else {
        throw `Unexpected version: '${version}' when detecting vanillaWhole.`
    }

    return {
        blockstates: {
            ...vanillaWhole.blockstates,
            ...customWhole.blockstates
        },
        models: {
            ...vanillaWhole.models,
            ...customWhole.models
        }
    }
}
