import { getNamespacedID, replaceWithRegExp, getRelFromNid } from './utils'

export class ResourceFilter {
    constructor(
        public readonly type: string,
        public readonly namespacedIDs: RegExp[],
        public readonly extensions: string[]
    ) { }

    public testPath(path: string) {
        for (const regex of this.namespacedIDs) {
            for (const ext of this.extensions) {
                if (path.slice(path.indexOf('.') + 1) === ext) {
                    const { type: sourceType, namespacedID } = getNamespacedID(path, ext)
                    if (sourceType === this.type) {
                        return regex.test(namespacedID)
                    }
                }
            }
        }
        return false
    }

    public getTargetPath(sourcePath: string, targetID: string) {
        for (const regex of this.namespacedIDs) {
            for (const ext of this.extensions) {
                if (sourcePath.slice(sourcePath.indexOf('.') + 1) === ext) {
                    const { type: sourceType, namespacedID: sourceID } = getNamespacedID(sourcePath, ext)
                    if (sourceType === this.type) {
                        const ansTargetID = replaceWithRegExp(targetID, sourceID, regex)
                        if (ansTargetID === '') {
                            return ''
                        } else {
                            return getRelFromNid(ansTargetID, this.type, ext)
                        }
                    }
                }
            }
        }
        return ''
    }
}

export default ResourceFilter
