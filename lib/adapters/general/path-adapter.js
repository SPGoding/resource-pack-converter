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
const utils_1 = require("../../utils/utils");
class PathAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            // Move files.
            for (const op of this.params.operations) {
                const path = op.filter.getTargetPath(input.path, op.set);
                if (path) {
                    logger.info(`Moved to '{outDir}/${path}'.`);
                    input = { content: input.content, path };
                }
            }
            // Change namespaced IDs in files.
            for (const op of this.params.operations) {
                const { type: inputType } = utils_1.getNamespacedID(input.path, 'json');
                if (inputType === 'blockstates' && op.filter.type === 'models') {
                }
                else if (inputType === 'models' && (op.filter.type === 'models' || op.filter.type === 'textures')) {
                }
            }
            return input;
        });
    }
}
exports.default = PathAdapter;
//# sourceMappingURL=path-adapter.js.map