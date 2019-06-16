import * as fs from 'fs-extra'
import * as path from 'path'

/**
 * Reprensets a file in the resource pack.
 */
export interface File {
    /**
     * The content of the file.
     */
    content: Buffer,
    /**
     * The relative path navigated from the root of a resource pack.
     */
    path: string
}

/**
 * A game version which the resource pack is compatible with.
 */
export type Version = 'JE1.6' | 'JE1.7' | 'JE1.8' | 'JE1.9' | 'JE1.10' | 'JE1.11' | 'JE1.12' | 'JE1.13' | 'JE1.14'

/**
 * Replaces the placeholders (`$x`) in `target` if `source.match(regex)` and returns the result.
 * Otherwise returns empty string (`''`).
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

/**
 * A logger.
 */
export class Logger {
    private readonly _logs: string[] = []
    private readonly _logFile: string | undefined
    private _indent: number = 0

    constructor(logFile?: string) {
        if (logFile) {
            this._logFile = path.resolve(logFile)
        }
    }

    private _log(type: 'INFO' | 'WARN' | 'EROR' | 'PRVC', ...msg: string[]) {
        const date = new Date()
        const fixTwoDigits = (number: number) => number < 10 ? `0${number}` : number.toString()
        const fixThreeDigits = (number: number) => number < 10 ? `00${number}` : number < 100 ? `0${number}` : number.toString()
        const time = `${fixTwoDigits(date.getHours())}:${fixTwoDigits(date.getMinutes())}:${fixTwoDigits(date.getSeconds())}:${fixThreeDigits(date.getMilliseconds())}`
        msg.forEach(v => {
            const m = `[${time}] [${type}] ${'  '.repeat(this._indent)}${v}`
            this._logs.push(m)
            if (this._logFile) {
                fs.appendFileSync(this._logFile, `${m}\n`)
            }
        })
        return this
    }

    public indent(delta = 1) {
        this._indent += delta
    }

    /**
     * Log an information.
     * @param msg The message.
     */
    public info(...msg: string[]) {
        return this._log('INFO', ...msg)
    }

    /**
     * Log a warning.
     * @param msg The message.
     */
    public warn(...msg: string[]) {
        return this._log('WARN', ...msg)
    }

    /**
     * Log an error.
     * @param msg The message.
     */
    public error(...msg: string[]) {
        return this._log('EROR', ...msg)
    }

    /**
     * Log a message which may leak user's privacy.
     * @param msg The message.
     */
    public prvc(...msg: string[]) {
        return this._log('PRVC', ...msg)
    }


    /**
     * Get all logs.
     */
    public toString() {
        return this._logs.join('\n')
    }
}

/**
 * Get the relative path of the specific directory navigated from the root.
 * @param root The root.
 * @param dir The specific directory.
 */
export function getRelativePath(root: string, dir: string): string {
    const result = path.resolve(dir).replace(path.resolve(root), '').replace(/\\/g, '/')
    if (result[0] === '/') {
        return result.slice(1)
    } else {
        return result
    }
}
