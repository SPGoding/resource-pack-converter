"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A logger.
 */
class Logger {
    constructor() {
        this._logs = [];
        this._indent = 0;
    }
    _log(type, ...msg) {
        const date = new Date();
        const fixTwoDigits = (number) => number < 10 ? `0${number}` : number.toString();
        const fixThreeDigits = (number) => number < 10 ? `00${number}` : number < 100 ? `0${number}` : number.toString();
        const time = `${fixTwoDigits(date.getHours())}:${fixTwoDigits(date.getMinutes())}:${fixTwoDigits(date.getSeconds())}:${fixThreeDigits(date.getMilliseconds())}`;
        msg.forEach(v => {
            const m = `[${time}] [MAIN] [${type}] ${'  '.repeat(this._indent)}${v}`;
            console.log(m);
            this._logs.push(m);
        });
        return this;
    }
    indent(delta = 1) {
        this._indent += delta;
        return this;
    }
    /**
     * Log an information.
     * @param msg The message.
     */
    info(...msg) {
        return this._log('INFO', ...msg);
    }
    /**
     * Log a warning.
     * @param msg The message.
     */
    warn(...msg) {
        return this._log('WARN', ...msg);
    }
    /**
     * Log an error.
     * @param msg The message.
     */
    error(...msg) {
        return this._log('EROR', ...msg);
    }
    /**
     * Log a message which may leak user's privacy.
     * @param msg The message.
     */
    prvc(...msg) {
        return this._log('PRVC', ...msg);
    }
    /**
     * Get all logs.
     */
    toString() {
        return this._logs.join('\n');
    }
}
exports.Logger = Logger;
exports.default = Logger;
//# sourceMappingURL=logger.js.map