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
        try {
            logger.info('Resouce Pack Converter made by @SPGoding <SPGoding@outlook.com>.');
            logger.dbug(`{inDir}  = '${inDir}'`, `{outDir} = '${outDir}'`);
            logger.dbug('Getting the Whole...').indent();
            const whole = yield getWhole(inDir, logger);
            yield logger.dbug('Got the Whole.').indent(-1);
            logger.dbug('Initializing adapters...').indent();
            const adapters = getAdapters(whole, options.conversion, logger);
            logger.dbug(`Initialized ${adapters.length} adapter(s).`).indent(-1);
            logger.info('Starting conversion...');
            yield convertWhole(whole, adapters, logger);
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
function getWhole(inDir, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const recurse = (dirPrefix, dir, ans) => __awaiter(this, void 0, void 0, function* () {
            const files = yield fs.readdir(dir);
            for (const v of files) {
                if ((yield fs.stat(path.join(dir, v))).isDirectory()) {
                    yield recurse(dirPrefix, path.join(dir, v), ans);
                }
                else {
                    const filePath = path.join(dir, v);
                    const ext = filePath.slice(filePath.indexOf('.', filePath.lastIndexOf(path.sep)) + 1);
                    const { nid, type } = utils_1.getNidFromRel(path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/'), ext);
                    const buffer = yield fs.readFile(filePath);
                    let category = ans[type];
                    category = category || {};
                    category[nid] = { buffer, ext: ext };
                    logger.dbug(`Added '${type} | ${ext} | ${nid}'.`);
                }
            }
        });
        const ans = {
            blockstates: {},
            lang: {},
            models: {},
            texts: {},
            textures: {},
            '?': {}
        };
        yield recurse(inDir, inDir, ans);
        return ans;
    });
}
function getAdapters(whole, conversion, logger) {
    const ans = [];
    for (const i of conversion.adapters) {
        if (i instanceof Adapter_1.default) {
            logger.dbug(`Initialized ${i.constructor.name}.`);
            ans.push(i);
        }
        else {
            const result = i(whole);
            if (result instanceof Array) {
                ans.push(...result);
                result.forEach(v => void logger.dbug(`Constructed ${v.constructor.name}.`));
            }
            else {
                ans.push(result);
                logger.dbug(`Constructed ${result.constructor.name}.`);
            }
        }
    }
    return ans;
}
function convertWhole(whole, adapters, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const type in whole) {
            if (whole.hasOwnProperty(type)) {
                const category = whole[type];
                for (const nid in category) {
                    if (category.hasOwnProperty(nid)) {
                        const ele = category[nid];
                        let resource = {
                            buffer: ele.buffer,
                            interpreted: ele.value,
                            loc: {
                                nid,
                                type,
                                ext: ele.ext
                            }
                        };
                        let resources = [];
                        logger.info(`Converting '${type} | ${ele.ext} | ${nid}'...`).indent();
                        for (const adapter of adapters) {
                            const result = yield adapter.execute(resource, logger);
                            if (result instanceof Array) {
                                resources.push(...result);
                                break;
                            }
                            else {
                                resource = result;
                                resources = [result];
                            }
                        }
                        for (const i of resources) {
                            whole[resource.loc.type][resource.loc.nid] = {
                                buffer: i.buffer,
                                value: i.interpreted,
                                ext: i.loc.ext
                            };
                        }
                        logger.info('Succeeded.').indent(-1);
                    }
                }
            }
        }
    });
}
exports.default = convert;
//# sourceMappingURL=converter.js.map