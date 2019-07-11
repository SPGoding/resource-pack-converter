import { getNidFromRel, replaceWithRegExp, getRelFromNid, standardizeNid } from './utils'
import { Location } from './Resource'

export default class ResourceFilter {
    /**
     * @param type Type of the resource. e,g, `textures`, `models`.
     * @param nid Namespaced ID(s).
     * @param extensions Without dot. e.g. `png`, `png.mcmeta`.
     */
    constructor(
        public readonly type: string,
        public readonly nid: (RegExp | string) | (RegExp | string)[],
        public readonly extensions: string[]
    ) { }

    /**
     * Test whether a namespaced ID match this filter.
     * You have to test whether the `type` and `extensions` match manually.
     * @param nid The namespaced ID.
     */
    public testNid(nid: string) {
        nid = standardizeNid(nid)
        if (this.nid instanceof Array) {
            for (const i of this.nid) {
                if (i instanceof RegExp) {
                    if (i.test(nid)) {
                        return true
                    }
                } else {
                    if (i === nid) {
                        return true
                    }
                }
            }
        } else {
            if (this.nid instanceof RegExp) {
                return this.nid.test(nid)
            } else {
                return this.nid === nid
            }
        }
        return false
    }

    public testLoc(loc: Location) {
        if (loc.type === this.type && this.extensions.indexOf(loc.ext) !== -1) {
            return this.testNid(loc.nid)
        }
        return false
    }

    public getTargetNid(loc: Location, targetNidWithPlaceholders: string) {
        if (loc.type !== '?') {
            loc.nid = standardizeNid(loc.nid)
        }
        if (loc.type === this.type && this.extensions.indexOf(loc.ext) !== -1) {
            if (this.nid instanceof Array) {
                for (const i of this.nid) {
                    if (i instanceof RegExp) {
                        const result = replaceWithRegExp(targetNidWithPlaceholders, loc.nid, i)
                        if (result) {
                            return result
                        }
                    } else {
                        if (loc.nid === i) {
                            return targetNidWithPlaceholders
                        }
                    }
                }
            } else {
                if (this.nid instanceof RegExp) {
                    return replaceWithRegExp(targetNidWithPlaceholders, loc.nid, this.nid)
                } else {
                    if (loc.nid === this.nid) {
                        return targetNidWithPlaceholders
                    }
                }
            }
        }
        return ''
    }

    // /**
    //  * @deprecated
    //  */
    // public testRel(rel: string) {
    //     for (const regex of this.nids) {
    //         for (const ext of this.extensions) {
    //             if (rel.slice(rel.indexOf('.') + 1) === ext) {
    //                 const { type: sourceType, nid } = getNidFromRel(rel, ext)
    //                 if (sourceType === this.type && regex.test(nid)) {
    //                     return true
    //                 }
    //             }
    //         }
    //     }
    //     return false
    // }

    // /**
    //  * @deprecated
    //  */
    // public getTargetRel(sourceRel: string, targetNidWithPlaceholders: string) {
    //     for (const regex of this.nids) {
    //         for (const ext of this.extensions) {
    //             if (sourceRel.slice(sourceRel.indexOf('.') + 1) === ext) {
    //                 const { type: sourceType, nid: sourceNid } = getNidFromRel(sourceRel, ext)
    //                 if (sourceType === this.type) {
    //                     const targetNid = replaceWithRegExp(targetNidWithPlaceholders, sourceNid, regex)
    //                     if (targetNid !== '') {
    //                         return getRelFromNid(targetNid, this.type, ext)
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return ''
    // }
}
