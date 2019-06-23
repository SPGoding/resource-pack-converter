import * as assert from 'power-assert'
import { Logger } from '../../utils/logger'

describe('logger.ts Tests', () => {
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
