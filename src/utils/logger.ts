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
