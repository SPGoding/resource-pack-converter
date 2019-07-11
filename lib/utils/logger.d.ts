/**
 * A logger.
 */
export default class Logger {
    private readonly _logs;
    private _indent;
    private _log;
    indent(delta?: number): this;
    /**
     * Log an information.
     * @param msg The message.
     */
    info(...msg: any[]): this;
    /**
     * Log a warning.
     * @param msg The message.
     */
    warn(...msg: any[]): this;
    /**
     * Log an error.
     * @param msg The message.
     */
    error(...msg: any[]): this;
    /**
     * Log a debugging message.
     * @param msg The message.
     */
    dbug(...msg: any[]): this;
    /**
     * Get all logs.
     */
    toString(): string;
}
