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
const Adapter_1 = require("./adapters/Adapter");
const utils_1 = require("./utils/utils");
const Logger_1 = require("./utils/Logger");
/**
 * Converts the input resource pack folder.
 * @param src The path of input resource pack folder.
 * @param options The options.
 */
function convert(src, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const inDir = path.resolve(src);
        const outDir = path.resolve(options.outDir);
        const logger = new Logger_1.default();
        const conversion = options.conversion;
        logger.info('Resouce Pack Converter made by @SPGoding <SPGoding@outlook.com>.');
        logger.info('Starting conversion...');
        logger.dbug(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`);
        logger.dbug('Getting the Whole...').indent();
        const whole = yield getWhole(inDir);
        yield logger.dbug(`Got the Whole: ${Object.keys(whole.blockstates).length} blockstates and ${Object.keys(whole.models).length} models.`).indent(-1);
        try {
            const adapters = [];
            let [adapterCount, adapterFunctionCount] = [0, 0];
            for (const i of conversion.adapters) {
                if (i instanceof Adapter_1.default) {
                    adapters.push(i);
                    adapterCount += 1;
                }
                else {
                    adapters.push(i(whole));
                    adapterFunctionCount += 1;
                }
            }
            logger.dbug(`Initialized ${adapters.length} (${adapterCount}, ${adapterFunctionCount}) adapter(s).`);
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
function getWhole(inDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const recurse = (dirPrefix, dir, ans) => __awaiter(this, void 0, void 0, function* () {
            const files = yield fs.readdir(dir);
            for (const v of files) {
                if ((yield fs.stat(path.join(dir, v))).isDirectory()) {
                    yield recurse(dirPrefix, path.join(dir, v), ans);
                }
                else {
                    const filePath = path.join(dir, v);
                    if (path.dirname(filePath)) {
                        const { nid, type } = utils_1.getNid(path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/'), '.json');
                        if (path.extname(v) === '.json' && (type === 'blockstates' || type === 'models')) {
                            const json = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
                            ans[type][nid] = JSON.stringify(Object.assign({}, json, { $isReplaced: true }));
                        }
                    }
                }
            }
        });
        const ans = {
            blockstates: {},
            models: {}
        };
        yield recurse(inDir, inDir, ans);
        return ans;
    });
}
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
                    const resource = { content, path: relPath };
                    yield convertSingleFile(resource, options);
                    logger.indent(-1);
                }
            }
        }
        catch (ex) {
            logger.error(ex);
        }
    });
}
function convertSingleFile(resource, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { outDir, adapters, logger } = options;
        let resources = undefined;
        try {
            for (const adapter of adapters) {
                const result = yield adapter.execute(resource, logger);
                if (result instanceof Array) {
                    resources = result;
                    break;
                }
                else {
                    resource = result;
                }
            }
            if (!resources) {
                resources = [resource];
            }
            for (const i of resources) {
                if (i.path) {
                    const absPath = path.join(outDir, path.dirname(i.path));
                    if (!fs.existsSync(absPath)) {
                        fs.mkdirSync(absPath, { recursive: true });
                    }
                    yield fs.writeFile(path.join(outDir, i.path), i.content);
                    logger.info(`Created file '{outDir}/${i.path}'.`);
                }
                else {
                    logger.info('Removed file.');
                }
            }
        }
        catch (ex) {
            logger.error(ex);
        }
    });
}
exports.default = convert;
//# sourceMappingURL=converter.js.map