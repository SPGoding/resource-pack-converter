import * as assert from 'power-assert'
import ResourceFilter from '../../utils/ResourceFilter'

describe('file-filter.ts Tests', () => {
    describe('FileFilter Tests', () => {
        describe('testRel() Tests', () => {
            it('Should return true when matches', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta'])
                const path = 'assets/minecraft/textures/items/diamond_sword.png.mcmeta'

                const actual = ff.testRel(path)

                assert.strictEqual(actual, true)
            })
            it("Should return false when doesn't match", () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta'])
                const path = 'assets/minecraft/models/items/diamond_sword.json'

                const actual = ff.testRel(path)

                assert.strictEqual(actual, false)
            })
        })
        describe('testNid() Tests', () => {
            it('Should return true when matches', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta'])
                const nid = 'minecraft:items/diamond_sword'

                const actual = ff.testNid(nid)

                assert.strictEqual(actual, true)
            })
            it('Should return true for omitting-namespaced ID', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta'])
                const nid = 'items/diamond_sword'

                const actual = ff.testNid(nid)

                assert.strictEqual(actual, true)
            })
            it("Should return false when doesn't match", () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta'])
                const nid = 'spgoding:items/diamond_sword'

                const actual = ff.testNid(nid)

                assert.strictEqual(actual, false)
            })
        })
        describe('getTargetRel() Tests', () => {
            it('Should replace placeholders', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/(\w+)$/], ['png', 'png.mcmeta'])
                const path = 'assets/minecraft/textures/items/diamond_sword.png.mcmeta'

                const actual = ff.getTargetRel(path, 'minecraft:item/$1')

                assert.strictEqual(actual, 'assets/minecraft/textures/item/diamond_sword.png.mcmeta')
            })
            it('Should return empty string', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/(\w+)$/], ['png', 'png.mcmeta'])
                const path = 'assets/minecraft/models/items/diamond_sword.json'

                const actual = ff.getTargetRel(path, 'minecraft:item/$1')

                assert.strictEqual(actual, '')
            })
        })
    })
})

