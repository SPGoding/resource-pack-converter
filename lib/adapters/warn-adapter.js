"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class WarnAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        for (const warning of this.params.warnings) {
            if (typeof warning.find === 'string') {
                warning.find = [warning.find];
            }
            for (const i of warning.find) {
                const regex = new RegExp(i);
                if (input.path.match(regex)) {
                    const messages = warning.send.map(v => utils_1.replaceWithRegExp(v, input.path, regex));
                    logger.warn(...messages);
                }
            }
        }
        return input;
    }
}
exports.WarnAdapter = WarnAdapter;
//# sourceMappingURL=warn-adapter.js.map