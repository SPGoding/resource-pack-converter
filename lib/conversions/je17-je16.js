"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_adapter_1 = require("../adapters/path-adapter");
const pack_mcmeta_adapter_1 = require("../adapters/pack-mcmeta-adapter");
exports.JE17ToJE16 = {
    from: 'JE1.7',
    to: 'JE1.6',
    adapters: [
        new pack_mcmeta_adapter_1.default({
            changeFormatTo: 1
        }),
        new path_adapter_1.default({
            operations: [
                {
                    find: '^assets/minecraft/textures/items/fish_cod_cooked\\.png(\\.mcmeta)?$',
                    moveTo: 'assets/minecraft/textures/items/fish_cooked.png$1'
                },
                {
                    find: '^assets/minecraft/textures/items/fish_cod_raw\\.png(\\.mcmeta)?$',
                    moveTo: 'assets/minecraft/textures/items/fish_raw.png$1'
                }
            ]
        })
    ]
};
exports.default = exports.JE17ToJE16;
//# sourceMappingURL=je17-je16.js.map