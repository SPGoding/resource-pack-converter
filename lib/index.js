"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Usage.
 * e.g. `node lib --in .\uti\input\1.7\ --out .\uti\output\1.8\ -f JE1.7 -t JE1.8 --force=true`
 */
const USAGE = 'node lib --in ${inDir} --out ${outDir} --from ${fromVersion} --to ${toVersion} [--force=true]';
const fs = require("fs-extra");
const path = require("path");
const minimist = require("minimist");
const converter_1 = require("./converter");
const conversion_1 = require("./conversions/conversion");
const argv = minimist(process.argv.slice(2), { alias: { in: 'i', out: 'o', from: 'f', to: 't' } });
try {
    if (argv.in && argv.out && argv.from && argv.to) {
        // Checking arguments.
        if (!fs.existsSync(argv.in)) {
            throw `Cannot find file '${argv.in}'.`;
        }
        if (fs.existsSync(argv.out) && !argv.force) {
            throw `Directory '${argv.out}' already exists.`;
        }
        // Preparation.
        let conversion = undefined;
        for (const i of conversion_1.CONVERSIONS) {
            if (i.from === argv.from && i.to === argv.to) {
                conversion = i;
            }
        }
        if (!conversion) {
            throw `Cannot find any conversions from '${argv.from}' into '${argv.to}'.`;
        }
        fs.removeSync(argv.out);
        fs.mkdirSync(argv.out, { recursive: true });
        // Conversion.
        converter_1.convert(argv.in, { conversion, outDir: argv.out }).then(logger => {
            fs.writeFile(path.join(argv.out, './latest.log'), logger.toString());
        });
    }
    else {
        throw `Usage: '${USAGE}'. Cannot find ${argv.in ? '' : 'in'}:${argv.out ? '' : 'out'}:${argv.from ? '' : 'from'}:${argv.to ? '' : 'to'}:${argv.force ? '' : 'force'}`;
    }
}
catch (ex) {
    console.error(ex);
    process.exit(1);
}
//# sourceMappingURL=index.js.map