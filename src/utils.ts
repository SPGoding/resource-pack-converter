export interface File {
    content: Buffer,
    path: string
}

export type Version = 'JE1.6' | 'JE1.7' | 'JE1.8' | 'JE1.9' | 'JE1.10' | 'JE1.11' | 'JE1.12' | 'JE1.13' | 'JE1.14'

export interface AdapterInitialization {
    /**
     * The identity of adapter.
     */
    id: string,
    /**
     * Stores all parameters used to initialize the adapter.
     */
    params: {
        [key: string]: any
    }
}

/**
 * Contains a set of adapters.
 */
export interface Conversion {
    /**
     * Specifies the game version which the conversion starts from.
     */
    from: Version,
    /**
     * Specifies the game version which the conversion ends with.
     */
    to: Version,
    /**
     * Initialize adapters here. Each object represents an adapter.
     */
    adapters: AdapterInitialization[]
}

/**
 * Replace the placeholders in `target` if `source.match(regex)`.
 * Otherwise return `''`.
 */
export function replaceWithRegExp(target: string, source: string, regex: RegExp) {
    const arr = source.match(regex)
    if (arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
            const element = arr[i]
            target = target.replace(new RegExp(`\\$${i + 1}`, 'g'), element)
        }
        target = target.replace(/\$0/g, source)
        return target
    } else {
        return ''
    }
}

export class Logger {
    private readonly _logs: string[]

    private _log(type: 'INFO' | 'WARNING' | 'ERROR', ...msg: string[]) {
        msg.forEach(v => this._logs.push(`[${new Date().toLocaleTimeString()}][${type}] ${v}`))
    }

    public info(...msg: string[]) {
        this._log('INFO', ...msg)
    }

    public warn(...msg: string[]) {
        this._log('WARNING', ...msg)
    }

    public error(...msg: string[]) {
        this._log('ERROR', ...msg)
    }

    public toString() {
        return this._logs.join('\n')
    }
}
