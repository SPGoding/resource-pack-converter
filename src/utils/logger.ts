/**
 * A logger.
 */
export default class Logger {
    private readonly _logs: string[] = []

    private _indent: number = 0

    private _log(type: 'INFO' | 'WARN' | 'EROR' | 'DBUG', ...msg: any[]) {
        const date = new Date()
        const fixTwoDigits = (number: number) => number < 10 ? `0${number}` : number.toString()
        const fixThreeDigits = (number: number) => number < 10 ? `00${number}` : number < 100 ? `0${number}` : number.toString()
        const time = `${fixTwoDigits(date.getHours())}:${fixTwoDigits(date.getMinutes())}:${fixTwoDigits(date.getSeconds())}:${fixThreeDigits(date.getMilliseconds())}`
        msg.forEach(v => {
            if (typeof v !== 'string' && typeof v !== 'number') {
                v = JSON.stringify(v)
            }
            const m = `[${time}] [MAIN] [${type}] ${'  '.repeat(this._indent)}${v}`
            // console.log(m)
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
    public info(...msg: any[]) {
        return this._log('INFO', ...msg)
    }

    /**
     * Log a warning.
     * @param msg The message.
     */
    public warn(...msg: any[]) {
        return this._log('WARN', ...msg)
    }

    /**
     * Log an error.
     * @param msg The message.
     */
    public error(...msg: any[]) {
        return this._log('EROR', ...msg)
    }

    /**
     * Log a debugging message.
     * @param msg The message.
     */
    public dbug(...msg: any[]) {
        return this._log('DBUG', ...msg)
    }

    /**
     * Get all logs.
     */
    public toString() {
        return this._logs.join('\n')
    }
}
