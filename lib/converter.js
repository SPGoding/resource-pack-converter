"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const utils_1 = require("./utils");
const adapter_1 = require("./adapters/adapter");
/**
 * Converts the input resource pack folder.
 * @param src The path of input resource pack folder.
 * @param options The options.
 */
function convert(src, options) {
    const inDir = path.resolve(src);
    const outDir = path.resolve(options.outDir);
    const logger = new utils_1.Logger();
    const conversion = options.conversion;
    logger.info('Resouce Pack Converter made by @SPGoding <SPGoding@outlook.com>.');
    logger.info('Starting conversion...');
    logger.prvc(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`);
    try {
        logger.info('Initializing adapters...').indent();
        const adapters = conversion.adapters.map(adapterInit => {
            for (const adapter of adapter_1.ADAPTERS) {
                if (adapter.name === adapterInit.id) {
                    logger.info(`Initialized adapter '${adapter.name}${JSON.stringify(adapterInit.params)}'.`);
                    return new adapter(adapterInit.params);
                }
            }
        });
        logger.info(`Initialized ${adapters.length} adapter(s).`).indent(-1);
        convertRecursively(inDir, inDir, { outDir, adapters, logger });
    }
    catch (ex) {
        logger.error(ex);
    }
    finally {
        logger.info('Finished conversion.');
        return logger;
    }
}
exports.convert = convert;
function convertRecursively(root, inDir, options) {
    const { outDir, logger } = options;
    try {
        const directories = fs.readdirSync(inDir);
        directories.forEach(v => {
            const absInPath = path.join(inDir, v);
            const relPath = utils_1.getRelativePath(root, absInPath);
            if ((fs.statSync(absInPath)).isDirectory()) {
                logger.info(`Handling directory '{inDir}/${relPath}'...`).indent();
                convertRecursively(root, absInPath, options);
                logger.indent(-1);
            }
            else {
                logger.info(`Handling file '{inDir}/${relPath}'...`).indent();
                const content = fs.readFileSync(absInPath);
                const file = { content, path: relPath };
                convertSingleFile(file, options);
                logger.indent(-1);
            }
        });
    }
    catch (ex) {
        logger.error(ex);
    }
}
function convertSingleFile(file, options) {
    const { outDir, adapters, logger } = options;
    try {
        for (const adapter of adapters) {
            file = adapter.execute(file, logger);
        }
        const filePath = path.join(outDir, path.dirname(file.path));
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(outDir, file.path), file.content);
        logger.info(`Created file '{outDir}/${file.path}'.`);
    }
    catch (ex) {
        logger.error(ex);
    }
}
exports.default = convert;
//# sourceMappingURL=converter.js.map