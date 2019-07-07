"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * Replaces the placeholders (`$x`) in `target` if `source.match(regex)` and returns the result.
 * Otherwise returns empty string (`''`).
 */
function replaceWithRegExp(target, source, regex) {
    const arr = source.match(regex);
    if (arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
            const element = arr[i];
            target = target.replace(new RegExp(`\\$${i}`, 'g'), element ? element : '');
        }
        return target;
    }
    else {
        return '';
    }
}
exports.replaceWithRegExp = replaceWithRegExp;
/**
 * Get the relative path navigated from {from} to {to}.
 * @param from The root.
 * @param to The specific directory.
 */
function getRelFromAbs(from, to) {
    const result = path.relative(from, to).replace(/\\/g, '/');
    if (result[0] === '/') {
        return result.slice(1);
    }
    else {
        return result;
    }
}
exports.getRelFromAbs = getRelFromAbs;
/**
 * Get the namespaced ID from an relative path.
 * @param path The relative path. e.g. `assets/minecraft/models/item/diamond.json`
 * @param ext The file extension. e.g. `json`.
 */
function getNidFromRel(path, ext) {
    const parts = path.split('/');
    if (parts.length >= 4) {
        const namespace = parts[1];
        const type = parts[2];
        const name = parts.slice(3).join('/').slice(0, -ext.length - 1);
        return { nid: `${namespace}:${name}`, type };
    }
    else {
        return { nid: path, type: '?' };
    }
}
exports.getNidFromRel = getNidFromRel;
/**
 * Standardize a namespaced ID.
 * @param nid The namespaced ID.
 */
function standardizeNid(nid) {
    if (nid.indexOf(':') === -1) {
        return `minecraft:${nid}`;
    }
    return nid;
}
exports.standardizeNid = standardizeNid;
/**
 * Get the relative path from an namespaced ID.
 * @param nid The namespaced ID.
 * @param type The type of resource.
 * @param ext The file extension.
 */
function getRelFromNid(nid, type, ext) {
    if (nid.indexOf(':') === -1) {
        nid = `minecraft:${nid}`;
    }
    const parts = nid.split(':');
    const namespace = parts[0];
    const name = parts[1];
    return `assets/${namespace}/${type}/${name}.${ext}`;
}
exports.getRelFromNid = getRelFromNid;
/**
 * Get the relative path from an namespaced ID.
 * @param nid The namespaced ID.
 * @param type The type of resource.
 * @param ext The file extension.
 */
function getRelFromLoc(loc) {
    return getRelFromNid(loc.nid, loc.type, loc.ext);
}
exports.getRelFromLoc = getRelFromLoc;
/**
 * Change all namespaced IDs in a blockstate.
 * @param bs The blockstate. Will be changed after execution.
 * @param filter The filter of the namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
function changeNidInBlockstate(bs, filter, setTo, logger) {
    if (bs.multipart) {
        for (let i = 0; i < bs.multipart.length; i++) {
            const part = bs.multipart[i];
            if (part.apply instanceof Array) {
                for (let j = 0; j < part.apply.length; j++) {
                    const apply = part.apply[j];
                    if (filter.testNid(apply.model)) {
                        logger.info(`Updated 'multipart[${i}].apply[${j}].model' from '${apply.model}' to '${setTo}'.`);
                        apply.model = setTo;
                    }
                }
            }
            else {
                if (filter.testNid(part.apply.model)) {
                    logger.info(`Updated 'multipart[${i}].apply.model' from '${part.apply.model}' to '${setTo}'.`);
                    part.apply.model = setTo;
                }
            }
        }
    }
    else if (bs.variants) {
        for (const key in bs.variants) {
            const variant = bs.variants[key];
            if (variant instanceof Array) {
                for (let i = 0; i < variant.length; i++) {
                    const model = variant[i];
                    if (filter.testNid(model.model)) {
                        logger.info(`Updated 'variants[${i}].model' from '${model.model}' to '${setTo}'.`);
                        model.model = setTo;
                    }
                }
            }
            else {
                if (filter.testNid(variant.model)) {
                    logger.info(`Updated 'variant.model' from '${variant.model}' to '${setTo}'.`);
                    variant.model = setTo;
                }
            }
        }
    }
}
exports.changeNidInBlockstate = changeNidInBlockstate;
/**
 * Change all model namespaced IDs in a model.
 * @param model The model. Will be changed after execution.
 * @param filter The filter of the model namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
function changeModelNidInModel(model, filter, setTo, logger) {
    if (model.parent) {
        const value = model.parent;
        if (filter.testNid(value)) {
            logger.info(`Updated 'parent' from '${value}' to '${setTo}'.`);
            model.parent = setTo;
        }
    }
    if (model.overrides) {
        for (let i = 0; i < model.overrides.length; i++) {
            const override = model.overrides[i];
            const value = override.model;
            if (value) {
                if (filter.testNid(value)) {
                    logger.info(`Updated 'overrides[${i}].model' from '${value}' to '${setTo}'.`);
                    override.model = setTo;
                }
            }
        }
    }
}
exports.changeModelNidInModel = changeModelNidInModel;
/**
 * Change all texture namespaced IDs in a model.
 * @param model The model. Will be changed after execution.
 * @param filter The filter of the texture namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
function changeTextureNidInModel(model, filter, setTo, logger) {
    if (model.textures) {
        for (const variable in model.textures) {
            const value = model.textures[variable];
            if (filter.testNid(value)) {
                logger.info(`Updated 'textures.${variable}' from '${value}' to '${setTo}'.`);
                model.textures[variable] = setTo;
            }
        }
    }
    if (model.elements) {
        for (let i = 0; i < model.elements.length; i++) {
            const element = model.elements[i];
            if (element.faces) {
                for (const direction in element.faces) {
                    const face = element.faces[direction];
                    const value = face.texture;
                    if (value) {
                        if (filter.testNid(value)) {
                            logger.info(`Updated 'elements[${i}].faces.texture' from '${value}' to '${setTo}'.`);
                        }
                    }
                }
            }
        }
    }
}
exports.changeTextureNidInModel = changeTextureNidInModel;
/**
 * Change all specific namespaced IDs in a model.
 * @param model The model. Will be changed after execution.
 * @param filter The filter of the namespaced ID.
 * @param setTo The new namespaced ID.
 * @param logger A logger.
 */
function changeNidInModel(model, filter, setTo, logger) {
    if (filter.type === 'models') {
        changeModelNidInModel(model, filter, setTo, logger);
    }
    else if (filter.type === 'textures') {
        changeTextureNidInModel(model, filter, setTo, logger);
    }
}
exports.changeNidInModel = changeNidInModel;
//# sourceMappingURL=utils.js.map