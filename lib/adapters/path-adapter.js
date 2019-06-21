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
const utils_1 = require("../utils");
class PathAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const op of this.params.operations) {
                if (typeof op.find === 'string') {
                    op.find = [op.find];
                }
                for (const i of op.find) {
                    const regex = new RegExp(i);
                    const path = utils_1.replaceWithRegExp(op.moveTo, input.path, regex);
                    if (path) {
                        logger.info(`Moved to '{outDir}/${path}'.`);
                        return {
                            content: input.content,
                            path
                        };
                    }
                }
            }
            return input;
        });
    }
}
exports.default = PathAdapter;
//# sourceMappingURL=path-adapter.js.map