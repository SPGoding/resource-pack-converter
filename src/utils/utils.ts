import * as path from 'path'

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
 * Get the relative path navigated from {from} to {to}.
 * @param from The root.
 * @param to The specific directory.
 */
export function getRelFromAbs(from: string, to: string): string {
    const result = path.relative(from, to).replace(/\\/g, '/')
    if (result[0] === '/') {
        return result.slice(1)
    } else {
        return result
    }
}

/**
 * Get the namespaced ID from an relative path.
 * @param path The relative path. e.g. `assets/minecraft/models/item/diamond.json`
 * @param ext The file extension. e.g. `json`.
 */
export function getNidFromRel(path: string, ext: string) {
    const parts = path.split('/')
    if (parts.length >= 4) {
        const namespace = parts[1]
        const type = parts[2]
        const name = parts.slice(3).join('/').slice(0, -ext.length - 1)
        return { nid: `${namespace}:${name}`, type }
    } else {
        return { nid: path, type: '?' }
    }
}

/**
 * Standardize a namespaced ID.
 * @param nid The namespaced ID.
 */
export function standardizeNid(nid: string) {
    if (nid.indexOf(':') === -1) {
        return `minecraft:${nid}`
    }
    return nid
}

/**
 * Get the relative path from an namespaced ID.
 * @param nid The namespaced ID.
 * @param type The type of resource.
 * @param ext The file extension.
 */
export function getRelFromNid(nid: string, type: string, ext: string) {
    if (nid.indexOf(':') === -1) {
        nid = `minecraft:${nid}`
    }
    const parts = nid.split(':')
    const namespace = parts[0]
    const name = parts[1]
    return `assets/${namespace}/${type}/${name}.${ext}`
}
