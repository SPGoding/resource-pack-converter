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
class WarnAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.WarnAdapter = WarnAdapter;
//# sourceMappingURL=warn-adapter.js.map