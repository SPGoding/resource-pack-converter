"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class ResourceFilter {
    constructor(type, namespacedIDs, extensions) {
        this.type = type;
        this.namespacedIDs = namespacedIDs;
        this.extensions = extensions;
    }
    testPath(path) {
        for (const regex of this.namespacedIDs) {
            for (const ext of this.extensions) {
                if (path.slice(path.indexOf('.') + 1) === ext) {
                    const { type: sourceType, namespacedID } = utils_1.getNamespacedID(path, ext);
                    if (sourceType === this.type) {
                        return regex.test(namespacedID);
                    }
                }
            }
        }
        return false;
    }
    getTargetPath(sourcePath, targetID) {
        for (const regex of this.namespacedIDs) {
            for (const ext of this.extensions) {
                if (sourcePath.slice(sourcePath.indexOf('.') + 1) === ext) {
                    const { type: sourceType, namespacedID: sourceID } = utils_1.getNamespacedID(sourcePath, ext);
                    if (sourceType === this.type) {
                        const ansTargetID = utils_1.replaceWithRegExp(targetID, sourceID, regex);
                        if (ansTargetID === '') {
                            return '';
                        }
                        else {
                            return utils_1.getRelFromNid(ansTargetID, this.type, ext);
                        }
                    }
                }
            }
        }
        return '';
    }
}
exports.ResourceFilter = ResourceFilter;
exports.default = ResourceFilter;
//# sourceMappingURL=resource-filter.js.map