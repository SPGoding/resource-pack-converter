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
 * Get the relative path navigated from {from} to {to}.
 * @param from The root.
 * @param to The specific directory.
 */
export declare function getRelativePath(from: string, to: string): string;
/**
 * Get the namespaced ID from an relative path.
 * @param path The relative path. e.g. `assets/minecraft/models/item/diamond.json`
 * @param ext The file extension. e.g. `json`.
 */
export declare function getNid(path: string, ext: string): {
    nid: string;
    type: string;
};
/**
 * Get the relative path from an namespaced ID.
 * @param nid The namespaced ID.
 * @param type The type of resource.
 * @param ext The file extension.
 */
export declare function getRelFromNid(nid: string, type: string, ext: string): string;
