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
const Logger_1 = require("./utils/Logger");
const utils_1 = require("./utils/utils");
const canvas_1 = require("canvas");
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
            const adapters = yield getAdapters(whole, options.conversion, logger);
            yield logger.dbug(`Initialized ${adapters.length} adapter(s).`).indent(-1);
            logger.info('Starting conversion...').indent();
            yield convertWhole(whole, adapters, logger);
            logger.info('Finished conversion.').indent(-1);
            logger.info('Saving the Whole...').indent();
            yield saveWhole(whole, outDir, logger);
            logger.info('Saved the Whole.').indent(-1);
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
                    const rel = path.relative(dirPrefix, path.resolve(path.join(dir, v))).replace(/\\/g, '/');
                    const { nid, type } = utils_1.getNidFromRel(rel, ext);
                    const buffer = yield fs.readFile(filePath);
                    const category = ans[type] || (ans[type] = {});
                    const extObject = category[ext] || (category[ext] = {});
                    extObject[nid] = buffer;
                    logger.dbug(`Added '{inDir}/${rel}' as '${type} | ${ext} | ${nid}'.`);
                }
            }
        });
        const ans = {
            blockstates: { json: {} },
            lang: {},
            models: { json: {} },
            texts: {},
            textures: { png: {}, 'png.mcmeta': {} },
            '?': {}
        };
        yield recurse(inDir, inDir, ans);
        return ans;
    });
}
function getAdapters(whole, conversion, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const ans = [];
        function addAdapter(op, adapter, array) {
            array.push(adapter);
            if (op === 'Initialized') {
                logger.dbug(`${op} ${adapter.constructor.name}`);
            }
            else {
                logger.dbug(`${op} ${adapter.constructor.name} with ${JSON.stringify(adapter.params)}`);
            }
        }
        for (const i of conversion.adapters) {
            if (i instanceof Function) {
                const result = i(whole);
                if (result instanceof Array) {
                    result.forEach(v => addAdapter('Constructed', v, ans));
                }
                else if (result instanceof Promise) {
                    const resolve = yield result;
                    if (resolve instanceof Array) {
                        resolve.forEach(v => addAdapter('Constructed', v, ans));
                    }
                    else {
                        addAdapter('Constructed', resolve, ans);
                    }
                }
                else {
                    addAdapter('Constructed', result, ans);
                }
            }
            else {
                addAdapter('Initialized', i, ans);
            }
        }
        return ans;
    });
}
function convertWhole(whole, adapters, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const type in whole) {
            if (whole.hasOwnProperty(type)) {
                const category = whole[type];
                for (const ext in category) {
                    if (category.hasOwnProperty(ext)) {
                        const extObject = category[ext];
                        for (const nid in extObject) {
                            if (extObject.hasOwnProperty(nid)) {
                                const value = extObject[nid];
                                let input = { value, loc: { nid, type, ext } };
                                let resources = [];
                                logger.info(`Converting '${type} | ${ext} | ${nid}'...`).indent();
                                for (const adapter of adapters) {
                                    const result = yield adapter.execute(input, logger);
                                    if (result instanceof Array) {
                                        resources.push(...result);
                                        break;
                                    }
                                    else {
                                        input = result;
                                        resources = [result];
                                    }
                                }
                                for (const i of resources) {
                                    whole[input.loc.type][input.loc.ext][input.loc.nid] = i.value;
                                }
                                logger.info('Succeeded.').indent(-1);
                            }
                        }
                    }
                }
            }
        }
    });
}
function saveWhole(whole, outDir, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info(whole);
        for (const type in whole) {
            if (whole.hasOwnProperty(type)) {
                const category = whole[type];
                for (const ext in category) {
                    if (category.hasOwnProperty(ext)) {
                        const extObject = category[ext];
                        for (const nid in extObject) {
                            if (extObject.hasOwnProperty(nid)) {
                                const value = extObject[nid];
                                const rel = utils_1.getRelFromNid(nid, type, ext);
                                const abs = path.join(outDir, rel);
                                const dir = path.dirname(abs);
                                if (typeof value === 'string') {
                                    extObject[nid] = Buffer.from(value, 'utf8');
                                }
                                else if (value instanceof canvas_1.Image) {
                                    extObject[nid] = value.src;
                                }
                                else if (value instanceof Object) {
                                    extObject[nid] = Buffer.from(JSON.stringify(value, undefined, 4), 'utf8');
                                }
                                if (!(yield fs.pathExists(dir))) {
                                    fs.mkdirSync(dir, { recursive: true });
                                }
                                yield fs.writeFile(abs, extObject[nid]);
                                logger.dbug(`Saved '${type} | ${ext} | ${nid}' to '{outDir}/${rel}'`);
                            }
                        }
                    }
                }
            }
        }
    });
}
exports.default = convert;
//# sourceMappingURL=converter.js.map