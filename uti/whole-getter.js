'use strict'

const fs = require('fs-extra')
const path = require('path')

const outputDir = path.join(__dirname, './output/whole-getter/')

process.stdout.setEncoding('utf8')

if (process.argv.length !== 4) {
    console.error("Use 'npm run uti:whole-getter ${inDir} ${output}' to get the Whole of '${inDir}'.")
    process.exit(1)
}

const inDir = process.argv[2]
const output = process.argv[3]

/**
 * A script which will create a JSON file containing all blockstates and models of an resource pack.
 * Use `npm run uti:whole-getter ${inDir} ${outDir}` to get the Whole of `${inDir}`.
 * The result will be stored in `uti/whole-getter/${outDir}`.
 * e.g. `npm run uti:whole-getter uti/input/1.8/ je1.8.json`
 * @author SPGoding
 */
class WholeGetter {
    constructor(inDir, output) {
        this.inDir = inDir
        this.output = output
    }

    get() {
        const result = {
            blockstates: {},
            models: {}
        }

        this.recurse(this.inDir, this.inDir, result)

        if (!fs.pathExistsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }

        fs.writeFileSync(
            path.join(outputDir, output),
            JSON.stringify(result),
            { encoding: 'utf8' }
        )
    }

    recurse(dirPrefix, dir, result) {
        const files = fs.readdirSync(dir)
        files.forEach(v => {
            if (fs.statSync(path.join(dir, v)).isDirectory()) {
                this.recurse(dirPrefix, path.join(dir, v), result)
            } else {
                const filePath = path.join(dir, v)
                if (path.dirname(filePath)) {
                    const { nid, type } = this.getNid(
                        path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/'),
                        '.json'
                    )
                    if (path.extname(v) === '.json' && (type === 'blockstates' || type === 'models')) {
                        const json = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))
                        result[type][nid] = json
                    }
                }
            }
        })
    }

    /**
     * Get the namespaced ID from an relative path.
     * @param path The relative path. e.g. `assets/minecraft/models/item/diamond.json`
     * @param ext The file extension. e.g. `json`.
     */
    getNid(path, ext) {
        const parts = path.split('/')
        if (parts.length >= 4) {
            const namespace = parts[1]
            const type = parts[2]
            const name = parts.slice(3).join('/').slice(0, -ext.length - 1)
            return { nid: `${namespace}:${name}`, type }
        } else {
            return { nid: path, type: '?' }
        }
    }
}

new WholeGetter(inDir, output).get()
