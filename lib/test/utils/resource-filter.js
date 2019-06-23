"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const resource_filter_1 = require("../../utils/resource-filter");
describe('file-filter.ts Tests', () => {
    describe('FileFilter Tests', () => {
        describe('testPath() Tests', () => {
            it('Should return true when matches', () => {
                const ff = new resource_filter_1.default('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta']);
                const path = 'assets/minecraft/textures/items/diamond_sword.png.mcmeta';
                const actual = ff.testPath(path);
                assert.strictEqual(actual, true);
            });
            it("Should return false when doesn't match", () => {
                const ff = new resource_filter_1.default('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta']);
                const path = 'assets/minecraft/models/items/diamond_sword.json';
                const actual = ff.testPath(path);
                assert.strictEqual(actual, false);
            });
        });
        describe('getTargetPath() Tests', () => {
            it('Should replace placeholders', () => {
                const ff = new resource_filter_1.default('textures', [/^minecraft:items\/(\w+)$/], ['png', 'png.mcmeta']);
                const path = 'assets/minecraft/textures/items/diamond_sword.png.mcmeta';
                const actual = ff.getTargetPath(path, 'minecraft:item/$1');
                assert.strictEqual(actual, 'assets/minecraft/textures/item/diamond_sword.png.mcmeta');
            });
            it('Should return empty string', () => {
                const ff = new resource_filter_1.default('textures', [/^minecraft:items\/(\w+)$/], ['png', 'png.mcmeta']);
                const path = 'assets/minecraft/models/items/diamond_sword.json';
                const actual = ff.getTargetPath(path, 'minecraft:item/$1');
                assert.strictEqual(actual, '');
            });
        });
    });
});
//# sourceMappingURL=resource-filter.js.map