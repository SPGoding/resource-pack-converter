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
const canvas_1 = require("canvas");
class ClockCompassAdapter {
    constructor() { }
    execute(input, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.handle(input, logger, 'clock');
            if (result instanceof Array) {
                return result;
            }
            else {
                return this.handle(input, logger, 'compass');
            }
        });
    }
    handle(input, logger, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.path === `assets/minecraft/textures/items/${name}.png`) {
                const resources = [];
                const img = yield canvas_1.loadImage(input.content);
                const length = img.width;
                const canvas = new canvas_1.Canvas(length, length);
                const count = img.height / length;
                for (let i = 0; i < count; i++) {
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, i * length, length, length, 0, 0, length, length);
                    resources.push({
                        content: canvas.toBuffer('image/png'),
                        path: `assets/minecraft/textures/items/${name}_${i < 10 ? `0${i}` : i}.png`
                    });
                }
                logger.info('Split to multiple textures.');
                return resources;
            }
            else {
                return input;
            }
        });
    }
}
exports.default = ClockCompassAdapter;
//# sourceMappingURL=clock-compass-adapter.js.map