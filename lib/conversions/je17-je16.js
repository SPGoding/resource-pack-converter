"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_adapter_1 = require("../adapters/general/path-adapter");
const pack_mcmeta_adapter_1 = require("../adapters/general/pack-mcmeta-adapter");
const resource_filter_1 = require("../utils/resource-filter");
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
                    filter: new resource_filter_1.default('textures', [/^minecraft:items\/fish_cod_cooked$/], ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_cooked'
                },
                {
                    filter: new resource_filter_1.default('textures', [/^minecraft:items\/fish_cod_raw$/], ['png', 'png.mcmeta']),
                    set: 'minecraft:items/fish_raw'
                }
            ]
        })
    ]
};
exports.default = exports.JE17ToJE16;
//# sourceMappingURL=je17-je16.js.map