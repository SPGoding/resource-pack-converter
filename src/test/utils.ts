import * as assert from 'power-assert'
import { replaceWithRegExp, Logger, getRelativePath } from '../utils'

describe('utils.ts Tests', () => {
    describe('replaceWithRegExp() Tests', () => {
        const source = 'abcdefghijk'
        const regex = /\w/g
        it('Should insert nothing into plain text', () => {
            const target = 'foo'

            const actual = replaceWithRegExp(target, source, regex)

            assert.strictEqual(actual, 'foo')
        })
        it('Should replace one digit', () => {
            const target = 'foo$1bar'

            const actual = replaceWithRegExp(target, source, regex)

            assert.strictEqual(actual, 'fooabar')
        })
        it('Should replace two digits', () => {
            const target = 'foo$11$1$2$10$3bar'

            const actual = replaceWithRegExp(target, source, regex)

            assert.strictEqual(actual, 'fookabjcbar')
        })
        it('Should replace $0 with whole source', () => {
            const target = 'foo$0bar'

            const actual = replaceWithRegExp(target, source, regex)

            assert.strictEqual(actual, 'fooabcdefghijkbar')
        })
    })
    describe('getRelativePath() Tests', () => {
        it('Should handle the relative path', () => {
            const root = 'F:\\.minecraft\\resourcepacks\\foo'
            const dir = 'F:\\.minecraft\\resourcepacks\\foo\\assets\\pack.mcmeta'

            const actual = getRelativePath(root, dir)

            assert.strictEqual(actual, 'assets/pack.mcmeta')
        })
        it('Should handle the relative path of root', () => {
            const root = 'F:\\.minecraft\\resourcepacks\\foo'
            const dir = 'F:\\.minecraft\\resourcepacks\\foo'

            const actual = getRelativePath(root, dir)

            assert.strictEqual(actual, '')
        })
        it('Should handle the relative path of relative paths', () => {
            const root = 'resourcepacks\\foo'
            const dir = 'resourcepacks\\foo\\assets\\pack.mcmeta'

            const actual = getRelativePath(root, dir)

            assert.strictEqual(actual, 'assets/pack.mcmeta')
        })
    })
    describe('Logger Tests', () => {
        describe('info() Tests', () => {
            it('Should send info', () => {
                const logger = new Logger()
                const string = 'Test info.'

                logger.info(string)
                const actual = logger.toString()

                assert(actual.indexOf('[INFO] Test info.') !== -1)
            })
        })
    })
})
