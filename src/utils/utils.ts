import * as path from 'path'
import { extname } from 'path'

/**
 * Reprensets an resource in the resource pack.
 */
export interface Resource {
    /**
     * The content of the resource.
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
 * Get the namespaced ID from {path}.
 * @param path The path.
 * @deprecated
 */
export function getNamespacedID(path: string) {
    // const parts = path.split('/')
    // if (parts[0] === 'assets' && parts.length >= 4) {
    //     const ext = extname(path).slice(1)
    //     const namespace = parts[1]
    //     const type = parts[2]
    //     const name = parts.slice(3).join('/')
    //     if (typeExtensionMap[type] !== ext) {
    //         return { namespacedID: path, type: '?other' }
    //     } else {
    //         return { namespacedID: `${namespace}:${name}`, type }
    //     }
    // } else {
    //     return { namespacedID: path, type: '?other' }
    // }
}

/**
 * Get the relative path from an namespaced ID.
 * @param namespacedID The namespaced ID.
 * @param type The type of resource.
 */
export function getRelFromNid(namespacedID: string, type: string, ext: string) {
    const parts = namespacedID.split(':');
    const namespace = parts[0]
    const name = parts[1]
    return `assets/${namespace}/${name}.${ext}`
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
