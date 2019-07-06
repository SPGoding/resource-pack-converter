import { getNidFromRel, replaceWithRegExp, getRelFromNid, standardizeNid } from './utils'

export default class ResourceFilter {
    constructor(
        public readonly type: string,
        public readonly nids: RegExp[],
        public readonly extensions: string[]
    ) { }

    public testNid(nid: string) {
        for (const regex of this.nids) {
            if (regex.test(standardizeNid(nid))) {
                return true
            }
        }
        return false
    }

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
