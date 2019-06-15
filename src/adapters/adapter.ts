import { File, Logger } from '../utils'
import { MoveAdapter } from './move-adapter'
import { WarnAdapter } from './warn-adapter'

export default interface Adapter {
    constructor: Function

    /**
     * Adapts.
     */
    execute(input: File, logger: Logger): Promise<File>
}

export const Adapters: any[] = [MoveAdapter, WarnAdapter]
