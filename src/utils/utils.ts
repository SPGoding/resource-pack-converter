import * as path from 'path'
import Blockstate from './Blockstate'
import Logger from './logger'
import ResourceFilter from './ResourceFilter'
import Model, { Direction } from './Model'
import { Location } from './Resource'

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

/**
 * Get the relative path from an namespaced ID.
 * @param nid The namespaced ID.
 * @param type The type of resource.
 * @param ext The file extension.
 */
export function getRelFromLoc(loc: Location) {
    return getRelFromNid(loc.nid, loc.type, loc.ext)
}

/**
 * Change all namespaced IDs in a blockstate.
 * @param bs The blockstate. Will be changed after execution.
 * @param filter The filter of the namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
export function changeNidInBlockstate(bs: Blockstate, filter: ResourceFilter, setTo: string, logger: Logger) {
    if (bs.multipart) {
        for (let i = 0; i < bs.multipart.length; i++) {
            const part = bs.multipart[i]
            if (part.apply instanceof Array) {
                for (let j = 0; j < part.apply.length; j++) {
                    const apply = part.apply[j]
                    if (filter.testNid(apply.model)) {
                        logger.info(`Updated 'multipart[${i}].apply[${j}].model' from '${apply.model}' to '${setTo}'.`)
                        apply.model = setTo
                    }
                }
            } else {
                if (filter.testNid(part.apply.model)) {
                    logger.info(`Updated 'multipart[${i}].apply.model' from '${part.apply.model}' to '${setTo}'.`)
                    part.apply.model = setTo
                }
            }
        }
    } else if (bs.variants) {
        for (const key in bs.variants) {
            const variant = bs.variants[key]
            if (variant instanceof Array) {
                for (let i = 0; i < variant.length; i++) {
                    const model = variant[i]
                    if (filter.testNid(model.model)) {
                        logger.info(`Updated 'variants[${i}].model' from '${model.model}' to '${setTo}'.`)
                        model.model = setTo
                    }
                }
            } else {
                if (filter.testNid(variant.model)) {
                    logger.info(`Updated 'variant.model' from '${variant.model}' to '${setTo}'.`)
                    variant.model = setTo
                }
            }
        }
    }
}

/**
 * Change all model namespaced IDs in a model.
 * @param model The model. Will be changed after execution.
 * @param filter The filter of the model namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
export function changeModelNidInModel(model: Model, filter: ResourceFilter, setTo: string, logger: Logger) {
    if (model.parent) {
        const value = model.parent
        if (filter.testNid(value)) {
            logger.info(`Updated 'parent' from '${value}' to '${setTo}'.`)
            model.parent = setTo
        }
    }
    if (model.overrides) {
        for (let i = 0; i < model.overrides.length; i++) {
            const override = model.overrides[i]
            const value = override.model
            if (value) {
                if (filter.testNid(value)) {
                    logger.info(`Updated 'overrides[${i}].model' from '${value}' to '${setTo}'.`)
                    override.model = setTo
                }
            }
        }
    }
}

/**
 * Change all texture namespaced IDs in a model.
 * @param model The model. Will be changed after execution.
 * @param filter The filter of the texture namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
export function changeTextureNidInModel(model: Model, filter: ResourceFilter, setTo: string, logger: Logger) {
    if (model.textures) {
        for (const variable in model.textures) {
            const value = model.textures[variable]
            if (filter.testNid(value)) {
                logger.info(`Updated 'textures.${variable}' from '${value}' to '${setTo}'.`)
                model.textures[variable] = setTo
            }
        }
    }
    if (model.elements) {
        for (let i = 0; i < model.elements.length; i++) {
            const element = model.elements[i]
            if (element.faces) {
                for (const direction in element.faces) {
                    const face = element.faces[(direction as Direction)]
                    const value = face.texture
                    if (value) {
                        if (filter.testNid(value)) {
                            logger.info(`Updated 'elements[${i}].faces.texture' from '${value}' to '${setTo}'.`)
                        }
                    }
                }
            }
        }
    }
}

/**
 * Change all specific namespaced IDs in a model.
 * @param model The model. Will be changed after execution.
 * @param filter The filter of the namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
export function changeNidInModel(model: Model, filter: ResourceFilter, setTo: string, logger: Logger) {
    if (filter.type === 'models') {
        changeModelNidInModel(model, filter, setTo, logger)
    } else if (filter.type === 'textures') {
        changeTextureNidInModel(model, filter, setTo, logger)
    }
}
