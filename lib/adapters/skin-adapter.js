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
const canvas_1 = require("canvas");
class SkinAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(this.params.find);
            const path = utils_1.replaceWithRegExp('$0', input.path, regex);
            if (path) {
                if (this.params.type === 'singleToDouble') {
                    const img = yield canvas_1.loadImage(input.content);
                    const length = img.width;
                    const canvas = new canvas_1.Canvas(length, length);
                    const slength = length / 4;
                    const y = length / 4 * 3;
                    const sx1 = 0;
                    const sy1 = length / 4;
                    const x1 = length / 4;
                    const sx2 = length / 8 * 5;
                    const sy2 = length / 4;
                    const x2 = length / 2;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    ctx.drawImage(img, sx1, sy1, slength, slength, x1, y, slength, slength);
                    ctx.drawImage(img, sx2, sy2, slength, slength, x2, y, slength, slength);
                    input.content = canvas.toBuffer('image/png');
                    logger.info('Added second layer for skin.');
                    return input;
                }
                else {
                    const img = yield canvas_1.loadImage(input.content);
                    const length = img.width;
                    const canvas = new canvas_1.Canvas(length, length / 2);
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    input.content = canvas.toBuffer('image/png');
                    logger.info('Removed second layer for skin.');
                    return input;
                }
            }
            else {
                return input;
            }
        });
    }
}
exports.default = SkinAdapter;
//# sourceMappingURL=skin-adapter.js.map