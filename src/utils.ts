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
            target = target.replace(new RegExp(`\\$${i}`, 'g'), element ? element : '')
        }
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
    private _indent: number = 0

    private _log(type: 'INFO' | 'WARN' | 'EROR' | 'PRVC', ...msg: string[]) {
        const date = new Date()
        const fixTwoDigits = (number: number) => number < 10 ? `0${number}` : number.toString()
        const fixThreeDigits = (number: number) => number < 10 ? `00${number}` : number < 100 ? `0${number}` : number.toString()
        const time = `${fixTwoDigits(date.getHours())}:${fixTwoDigits(date.getMinutes())}:${fixTwoDigits(date.getSeconds())}:${fixThreeDigits(date.getMilliseconds())}`
        msg.forEach(v => {
            const m = `[${time}] [MAIN] [${type}] ${'  '.repeat(this._indent)}${v}`
            this._logs.push(m)
        })
        return this
    }

    public indent(delta = 1) {
        this._indent += delta
        return this
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
 * Get the relative path navigated from {from} to {to}.
 * @param from The root.
 * @param to The specific directory.
 */
export function getRelativePath(from: string, to: string): string {
    const result = path.relative(from, to).replace(/\\/g, '/')
    if (result[0] === '/') {
        return result.slice(1)
    } else {
        return result
    }
}

/**
 * Structure of `pack.mcmeta`.
 */
export interface PackMcmeta {
    pack: {
        pack_format: number,
        description: TextComponent
    },
    language?: {
        [code: string]: {
            name?: string,
            region?: string,
            bidirectional?: boolean
        }
    },
    [key: string]: any
}

/**
 * Structure of text components.
 */
export type TextComponent = string | boolean | number | TextComponentObject | TextComponentObject[]

/**
 * Structure of text component objects.
 */
interface TextComponentObject {
    text?: string,
    translate?: string,
    score?: {
        name?: string,
        objective?: string,
        value?: string
    },
    selector?: string,
    keybind?: string,
    nbt?: string,
    with?: TextComponent[],
    interpret?: boolean,
    block?: string,
    entity?: string,
    color?: string,
    bold?: boolean,
    italic?: boolean,
    underlined?: boolean,
    strikethrough?: boolean,
    obfuscated?: boolean,
    insertion?: string,
    clickEvent?: {
        action?: 'open_url' | 'open_file' | 'run_command' | 'change_page' | 'suggest_command',
        value?: string,
    },
    hoverEvent?: {
        action?: 'show_text' | 'show_item' | 'show_entity',
        value?: string | TextComponent,
    },
    extra?: TextComponentObject | TextComponentObject[],
    [key: string]: any
}
