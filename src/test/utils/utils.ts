import * as assert from 'power-assert'
import { replaceWithRegExp, getRelativePath, getNamespacedID } from '../../utils/utils'

describe('utils.ts Tests', () => {
    describe('replaceWithRegExp() Tests', () => {
        const source = 'abc123def'
        const regex = /abc(\d+)(\w+)/
        it('Should insert nothing into plain text', () => {
            const target = 'foo'

            const actual = replaceWithRegExp(target, source, regex)

            assert.strictEqual(actual, 'foo')
        })
        it('Should replace placeholders', () => {
            const target = '$0,$1,$2'

            const actual = replaceWithRegExp(target, source, regex)

            assert.strictEqual(actual, 'abc123def,123,def')
        })
    })
    describe('getRelativePath() Tests', () => {
        it('Should handle the relative path of relative paths', () => {
            const root = 'resourcepacks/foo'
            const dir = 'resourcepacks/foo/assets/pack.mcmeta'

            const actual = getRelativePath(root, dir)

            assert.strictEqual(actual, 'assets/pack.mcmeta')
        })
    })
    describe('getNamespacedID() Tests', () => {
        it('Should handle the relative path', () => {
            const relPath = 'assets/minecraft/textures/item/diamond_sword.png'
            const ext = 'png'

            const actual = getNamespacedID(relPath, ext)

            assert.deepStrictEqual(actual, { namespacedID: 'minecraft:item/diamond_sword', type: 'textures' })
        })
        it('Should handle non-resource file', () => {
            const relPath = 'pack.mcmeta'
            const ext = 'png'

            const actual = getNamespacedID(relPath, ext)

            assert.deepStrictEqual(actual, { namespacedID: 'pack.mcmeta', type: '?' })
        })
    })
})
