"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PackMcmetaAdapter_1 = require("../adapters/general/PackMcmetaAdapter");
const SkinAdapter_1 = require("../adapters/je18-je17/SkinAdapter");
exports.JE18ToJE17 = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        new PackMcmetaAdapter_1.default({
            changeFormatTo: 1
        }),
        new SkinAdapter_1.default({
            find: /^assets\/minecraft\/textures\/entity\/steve\.png$/
        })
    ]
};
exports.default = exports.JE18ToJE17;
//# sourceMappingURL=je18-je17.js.map