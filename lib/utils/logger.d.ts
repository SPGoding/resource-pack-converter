/**
 * A logger.
 */
export declare class Logger {
    private readonly _logs;
    private _indent;
    private _log;
    indent(delta?: number): this;
    /**
     * Log an information.
     * @param msg The message.
     */
    info(...msg: string[]): this;
    /**
     * Log a warning.
     * @param msg The message.
     */
    warn(...msg: string[]): this;
    /**
     * Log an error.
     * @param msg The message.
     */
    error(...msg: string[]): this;
    /**
     * Log a message which may leak user's privacy.
     * @param msg The message.
     */
    prvc(...msg: string[]): this;
    /**
     * Get all logs.
     */
    toString(): string;
}
export default Logger;
