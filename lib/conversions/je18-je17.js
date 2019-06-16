"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JE18ToJE17 = {
    from: 'JE1.8',
    to: 'JE1.7',
    adapters: [
        {
            id: 'SkinAdapter',
            params: {
                find: '^assets/minecraft/textures/entity/steve\\.png$',
                type: 'doubleToSingle'
            }
        }
    ]
};
exports.default = exports.JE18ToJE17;
//# sourceMappingURL=je18-je17.js.map