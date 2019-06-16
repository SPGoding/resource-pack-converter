"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class PathAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        for (const op of this.params.operations) {
            if (typeof op.find === 'string') {
                op.find = [op.find];
            }
            for (const i of op.find) {
                const regex = new RegExp(i);
                const path = utils_1.replaceWithRegExp(op.moveTo, input.path, regex);
                if (path) {
                    logger.info(`Moved '{inDir}/${input.path}' to '{outDir}/${path}'.`);
                    return {
                        content: input.content,
                        path
                    };
                }
            }
        }
        return input;
    }
}
exports.PathAdapter = PathAdapter;
//# sourceMappingURL=path-adapter.js.map