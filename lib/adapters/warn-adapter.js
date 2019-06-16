"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class WarnAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        for (const warning of this.params.warnings) {
            const regex = new RegExp(warning.find);
            if (input.path.match(regex)) {
                const messages = warning.send.map(v => utils_1.replaceWithRegExp(v, input.path, regex));
                logger.warn(...messages);
            }
        }
        return input;
    }
}
exports.WarnAdapter = WarnAdapter;
//# sourceMappingURL=warn-adapter.js.map