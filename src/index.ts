import { promises as fs } from 'fs-extra'
import * as JSZip from 'jszip'

export type Version = 'JE1.6' | 'JE1.7' | 'JE1.8' | 'JE1.9' | 'JE1.10' | 'JE1.11' | 'JE1.12' | 'JE1.13' | 'JE1.14'

export interface ConverterOptions {
    from: Version,
    to: Version
}

export interface ConvertedResult {
    file: Buffer,
    info?: string[],
    warnings?: string[],
    errors?: string[]
}

export async function convert(source: Buffer, options: ConverterOptions): Promise<ConvertedResult> {
    const zip = new JSZip(source)
    
    throw new Error('TODO')
}

export default convert
