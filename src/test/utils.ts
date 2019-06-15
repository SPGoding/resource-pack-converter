import * as assert from 'power-assert'
import { replaceWithRegExp } from '../utils'

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
})
