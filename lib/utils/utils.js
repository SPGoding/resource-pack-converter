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
function getRelativePath(from, to) {
    const result = path.relative(from, to).replace(/\\/g, '/');
    if (result[0] === '/') {
        return result.slice(1);
    }
    else {
        return result;
    }
}
exports.getRelativePath = getRelativePath;
/**
 * Get the namespaced ID from an relative path.
 * @param path The relative path. e.g. `assets/minecraft/models/item/diamond.json`
 * @param ext The file extension. e.g. `json`.
 */
function getNid(path, ext) {
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
exports.getNid = getNid;
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
//# sourceMappingURL=utils.js.map