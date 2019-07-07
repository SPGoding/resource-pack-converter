import { getNidFromRel, replaceWithRegExp, getRelFromNid, standardizeNid } from './utils'
import { Location } from './Resource'

export default class ResourceFilter {
    /**
     * @param type Type of the resource. e,g, `textures`, `models`.
     * @param nids Namespaced IDs.
     * @param extensions Without dot. e.g. `png`, `png.mcmeta`.
     */
    constructor(
        public readonly type: string,
        public readonly nids: RegExp[],
        public readonly extensions: string[]
    ) { }

    /**
     * Test whether a namespaced ID match this filter.
     * You have to test whether the `type` and `extensions` match manually.
     * @param nid The namespaced ID.
     */
    public testNid(nid: string) {
        for (const regex of this.nids) {
            if (regex.test(standardizeNid(nid))) {
                return true
            }
        }
        return false
    }

    public testLoc(loc: Location) {
        if (loc.type === this.type && this.extensions.indexOf(loc.ext) !== -1) {
            for (const regex of this.nids) {
                if (regex.test(standardizeNid(loc.nid))) {
                    return true
                }
            }
        }
        return false
    }

    public getTargetNid(loc: Location, targetNidWithPlaceholders: string) {
        if (loc.type === this.type && this.extensions.indexOf(loc.ext) !== -1) {
            for (const regex of this.nids) {
                const targetNid = replaceWithRegExp(targetNidWithPlaceholders, loc.nid, regex)
                if (targetNid) {
                    return targetNid
                }
            }
        }
        return ''
    }

    /**
     * @deprecated
     */
    public testRel(rel: string) {
        for (const regex of this.nids) {
            for (const ext of this.extensions) {
                if (rel.slice(rel.indexOf('.') + 1) === ext) {
                    const { type: sourceType, nid } = getNidFromRel(rel, ext)
                    if (sourceType === this.type && regex.test(nid)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    /**
     * @deprecated
     */
    public getTargetRel(sourceRel: string, targetNidWithPlaceholders: string) {
        for (const regex of this.nids) {
            for (const ext of this.extensions) {
                if (sourceRel.slice(sourceRel.indexOf('.') + 1) === ext) {
                    const { type: sourceType, nid: sourceNid } = getNidFromRel(sourceRel, ext)
                    if (sourceType === this.type) {
                        const targetNid = replaceWithRegExp(targetNidWithPlaceholders, sourceNid, regex)
                        if (targetNid !== '') {
                            return getRelFromNid(targetNid, this.type, ext)
                        }
                    }
                }
            }
        }
        return ''
    }
}
