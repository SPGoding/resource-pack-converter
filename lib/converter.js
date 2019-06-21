"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const utils_1 = require("./utils");
/**
 * Converts the input resource pack folder.
 * @param src The path of input resource pack folder.
 * @param options The options.
 */
function convert(src, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const inDir = path.resolve(src);
        const outDir = path.resolve(options.outDir);
        const logger = new utils_1.Logger();
        const conversion = options.conversion;
        logger.info('Resouce Pack Converter made by @SPGoding <SPGoding@outlook.com>.');
        logger.info('Starting conversion...');
        logger.prvc(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`);
        try {
            const adapters = conversion.adapters;
            logger.info(`Initialized ${adapters.length} adapter(s).`);
            yield convertRecursively(inDir, inDir, { outDir, adapters, logger });
            logger.info('Finished conversion.');
        }
        catch (ex) {
            logger.error(ex);
        }
        finally {
            return logger;
        }
    });
}
exports.convert = convert;
function convertRecursively(root, inDir, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { logger } = options;
        try {
            const directories = yield fs.readdir(inDir);
            for (const i of directories) {
                const absInPath = path.join(inDir, i);
                const relPath = utils_1.getRelativePath(root, absInPath);
                if ((yield fs.stat(absInPath)).isDirectory()) {
                    logger.info(`Handling directory '{inDir}/${relPath}'...`).indent();
                    yield convertRecursively(root, absInPath, options);
                    logger.indent(-1);
                }
                else {
                    logger.info(`Handling file '{inDir}/${relPath}'...`).indent();
                    const content = yield fs.readFile(absInPath);
                    const file = { content, path: relPath };
                    yield convertSingleFile(file, options);
                    logger.indent(-1);
                }
            }
        }
        catch (ex) {
            logger.error(ex);
        }
    });
}
function convertSingleFile(file, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { outDir, adapters, logger } = options;
        try {
            for (const adapter of adapters) {
                file = yield adapter.execute(file, logger);
            }
            const filePath = path.join(outDir, path.dirname(file.path));
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            yield fs.writeFile(path.join(outDir, file.path), file.content);
            logger.info(`Created file '{outDir}/${file.path}'.`);
        }
        catch (ex) {
            logger.error(ex);
        }
    });
}
exports.default = convert;
//# sourceMappingURL=converter.js.map