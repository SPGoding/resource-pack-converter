"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class ResourceFilter {
    constructor(type, nids, extensions) {
        this.type = type;
        this.nids = nids;
        this.extensions = extensions;
    }
    testPath(path) {
        for (const regex of this.nids) {
            for (const ext of this.extensions) {
                if (path.slice(path.indexOf('.') + 1) === ext) {
                    const { type: sourceType, nid } = utils_1.getNid(path, ext);
                    if (sourceType === this.type) {
                        return regex.test(nid);
                    }
                }
            }
        }
        return false;
    }
    getTargetPath(sourcePath, targetID) {
        for (const regex of this.nids) {
            for (const ext of this.extensions) {
                if (sourcePath.slice(sourcePath.indexOf('.') + 1) === ext) {
                    const { type: sourceType, nid: sourceID } = utils_1.getNid(sourcePath, ext);
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