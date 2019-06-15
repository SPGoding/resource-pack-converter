'use strict'

const fs = require('fs-extra')
const path = require('path')
const crypto = require('crypto')

const outputDir = path.join(__dirname, './output/analyzer/')

process.stdout.setEncoding('utf8')

if (process.argv.length !== 5) {
    console.error("Use 'npm run uti:analyzer ${dirFrom} ${dirTo} ${output}' to analyze differences between '${dirFrom}' and '${dirTo}'.")
    process.exit(1)
}

const dirFrom = process.argv[2]
const dirTo = process.argv[3]
const output = process.argv[4]

/**
 * An resource pack analyzer which can find the differences (e.g. file names) between 
 * two resource packs (only support folders) and generate conversion files.
 * Use `npm run uti:analyzer ${dirFrom} ${dirTo} ${output}` to analyze differences between `${dirFrom}` and `${dirTo}`.
 * The result will be stored in `./uti/analyzer/${output}`.
 * @author SPGoding
 */
class Analyzer {
    constructor(dirFrom, dirTo) {
        this.dirFrom = dirFrom
        this.dirTo = dirTo
    }

    analyze() {
        const result = {
            keep: [],
            rename: [],
            change: [],
            remove: [],
            create: []
        }
        const from = {}
        const to = {}

        this.recurse(this.dirFrom, this.dirFrom, from)
        this.recurse(this.dirTo, this.dirTo, to)
        const toDuplicated = { ...to }

        for (const file in from) {
            const sha1From = from[file]
            if (to[file]) {
                // KEEP or CHANGE
                if (to[file] === sha1From) {
                    // KEEP
                    result.keep.push(file)
                } else {
                    // CHANGE
                    result.change.push(file)
                }
                delete toDuplicated[file]
            } else {
                // RENAME or REMOVE
                const toOneOf = []
                for (const fileTo in to) {
                    const sha1To = to[fileTo]
                    if (sha1From === sha1To) {
                        toOneOf.push(fileTo)
                        delete toDuplicated[fileTo]
                    }
                }
                if (toOneOf.length > 0) {
                    // RENAME
                    result.rename.push({
                        from: file,
                        toOneOf
                    })
                } else {
                    // REMOVE
                    result.remove.push(file)
                }
            }
        }

        for (const file in toDuplicated) {
            // CREATE
            result.create.push(file)
        }

        if (!fs.pathExistsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }
        fs.writeFileSync(
            path.join(outputDir, output),
            JSON.stringify(result, undefined, 4),
            { encoding: 'utf8' }
        )

        return result
    }

    recurse(dirPrefix, dir, array) {
        const files = fs.readdirSync(dir)
        files.forEach(v => {
            if (fs.statSync(path.join(dir, v)).isDirectory()) {
                this.recurse(dirPrefix, path.join(dir, v), array)
            } else {
                const content = fs.readFileSync(path.join(dir, v), { encoding: 'utf8' })
                const sha1 = crypto.createHash('sha1').update(content).digest('hex')

                array[path.join(dir, v).replace(path.join(dirPrefix), '').replace(/\\/g, '/')] = sha1
            }
        })
    }
}

new Analyzer(dirFrom, dirTo).analyze()
