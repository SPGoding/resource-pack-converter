/**
 * Reprensets a file in the resource pack.
 */
export interface File {
    /**
     * The content of the file.
     */
    content: Buffer;
    /**
     * The relative path navigated from the root of a resource pack.
     */
    path: string;
}
/**
 * A game version which the resource pack is compatible with.
 */
export declare type Version = 'JE1.6' | 'JE1.7' | 'JE1.8' | 'JE1.9' | 'JE1.10' | 'JE1.11' | 'JE1.12' | 'JE1.13' | 'JE1.14';
/**
 * Replaces the placeholders (`$x`) in `target` if `source.match(regex)` and returns the result.
 * Otherwise returns empty string (`''`).
 */
export declare function replaceWithRegExp(target: string, source: string, regex: RegExp): string;
/**
 * A logger.
 */
export declare class Logger {
    private readonly _logs;
    private _indent;
    private _log;
    indent(delta?: number): void;
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
/**
 * Get the relative path navigated from {from} to {to}.
 * @param from The root.
 * @param to The specific directory.
 */
export declare function getRelativePath(from: string, to: string): string;
