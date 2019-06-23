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
class PackMcmetaAdapter {
    constructor(params) {
        this.params = params;
    }
    execute(input, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.path === 'pack.mcmeta') {
                const obj = JSON.parse(input.content.toString('utf8'));
                obj['$resource-pack-converter'] = {
                    info: 'This resource pack is converted by resource-pack-converter',
                    github: 'https://github.com/SPGoding/resource-pack-converter'
                };
                const oldFormat = obj.pack ? obj.pack.pack_format : undefined;
                const targetFormat = this.params.changeFormatTo;
                if (oldFormat !== targetFormat) {
                    logger.info(`Changed pack.pack_format from '${oldFormat}' to '${targetFormat}'.`);
                    if (obj.pack) {
                        obj.pack.pack_format = targetFormat;
                    }
                    else {
                        obj.pack = { pack_format: targetFormat, description: '' };
                    }
                }
                input.content = Buffer.from(JSON.stringify(obj, undefined, 4), 'utf8');
                return input;
            }
            else {
                return input;
            }
        });
    }
}
exports.default = PackMcmetaAdapter;
//# sourceMappingURL=pack-mcmeta-adapter.js.map