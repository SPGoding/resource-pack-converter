"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const utils_1 = require("../utils/utils");
const Logger_1 = require("../utils/Logger");
describe('utils.ts Tests', () => {
    describe('replaceWithRegExp() Tests', () => {
        const source = 'abc123def';
        const regex = /abc(\d+)(\w+)/;
        it('Should insert nothing into plain text', () => {
            const target = 'foo';
            const actual = utils_1.replaceWithRegExp(target, source, regex);
            assert.strictEqual(actual, 'foo');
        });
        it('Should replace placeholders', () => {
            const target = '$0,$1,$2';
            const actual = utils_1.replaceWithRegExp(target, source, regex);
            assert.strictEqual(actual, 'abc123def,123,def');
        });
    });
    describe('getRelativePath() Tests', () => {
        it('Should handle the relative path of relative paths', () => {
            const root = 'resourcepacks/foo';
            const dir = 'resourcepacks/foo/assets/pack.mcmeta';
            const actual = utils_1.getRelativePath(root, dir);
            assert.strictEqual(actual, 'assets/pack.mcmeta');
        });
    });
    describe('Logger Tests', () => {
        describe('info() Tests', () => {
            it('Should send info', () => {
                const logger = new Logger_1.Logger();
                const string = 'Test info.';
                logger.info(string);
                const actual = logger.toString();
                assert(actual.indexOf('[INFO] Test info.') !== -1);
            });
        });
    });
});
//# sourceMappingURL=utils.js.map