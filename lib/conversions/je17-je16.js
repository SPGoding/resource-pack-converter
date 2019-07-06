"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathAdapter_1 = require("../adapters/general/PathAdapter");
const PackMcmetaAdapter_1 = require("../adapters/general/PackMcmetaAdapter");
const resource_filter_1 = require("../utils/resource-filter");
exports.JE17ToJE16 = {
    from: 'JE1.7',
    to: 'JE1.6',
    adapters: [
        new PackMcmetaAdapter_1.default({
            changeFormatTo: 1
        }),
        new PathAdapter_1.default({
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