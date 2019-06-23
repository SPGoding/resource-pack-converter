"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pack_mcmeta_adapter_1 = require("../adapters/general/pack-mcmeta-adapter");
const skin_adapter_1 = require("../adapters/je18-je17/skin-adapter");
exports.JE18ToJE17 = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        new pack_mcmeta_adapter_1.default({
            changeFormatTo: 1
        }),
        new skin_adapter_1.default({
            find: '^assets/minecraft/textures/entity/steve\\.png$'
        })
    ]
};
exports.default = exports.JE18ToJE17;
//# sourceMappingURL=je18-je17.js.map