import * as assert from 'power-assert'
import ResourceFilter from '../../utils/ResourceFilter'

describe('file-filter.ts Tests', () => {
    describe('FileFilter Tests', () => {
        describe('testNid() Tests', () => {
            it('Should return true when I specify single regex', () => {
                const ff = new ResourceFilter('textures', /^minecraft:items\/diamond_sword$/, ['png', 'png.mcmeta'])
                const nid = 'minecraft:items/diamond_sword'

                const actual = ff.testNid(nid)

                assert.strictEqual(actual, true)
            })
            it('Should return true when I specify single string', () => {
                const ff = new ResourceFilter('textures', 'minecraft:items/diamond_sword', ['png', 'png.mcmeta'])
                const nid = 'minecraft:items/diamond_sword'

                const actual = ff.testNid(nid)

                assert.strictEqual(actual, true)
            })
            it('Should return true when I specify regex array', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/diamond_sword$/], ['png', 'png.mcmeta'])
                const nid = 'minecraft:items/diamond_sword'

                const actual = ff.testNid(nid)

                assert.strictEqual(actual, true)
            })
            it('Should return true when I specify string array', () => {
                const ff = new ResourceFilter('textures', ['minecraft:items/diamond_sword'], ['png', 'png.mcmeta'])
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
        describe('getTargetNid() Tests', () => {
            it('Should replace placeholders', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/(\w+)$/], ['png', 'png.mcmeta'])
                const nid = 'minecraft:items/diamond_sword'

                const actual = ff.getTargetNid({
                    nid,
                    type: 'textures',
                    ext: 'png.mcmeta'
                }, 'minecraft:item/$1')

                assert.strictEqual(actual, 'minecraft:item/diamond_sword')
            })
            it('Should replace placeholders', () => {
                const ff = new ResourceFilter('textures', [/^minecraft:items\/(\w+)$/], ['png', 'png.mcmeta'])
                const nid = 'minecraft:item/diamond_sword'

                const actual = ff.getTargetNid({
                    nid,
                    type: 'textures',
                    ext: 'png.mcmeta'
                }, 'minecraft:item/$1')

                assert.strictEqual(actual, '')
            })
        })
    })
})

