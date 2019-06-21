"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skin_adapter_1 = require("../adapters/skin-adapter");
const pack_mcmeta_adapter_1 = require("../adapters/pack-mcmeta-adapter");
exports.JE18ToJE17 = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        new pack_mcmeta_adapter_1.default({
            changeFormatTo: 1
        }),
        new skin_adapter_1.default({
            find: '^assets/minecraft/textures/entity/steve\\.png$',
            type: 'doubleToSingle'
        })
    ]
};
exports.default = exports.JE18ToJE17;
//# sourceMappingURL=je18-je17.js.map