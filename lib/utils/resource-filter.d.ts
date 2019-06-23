export declare class ResourceFilter {
    readonly type: string;
    readonly namespacedIDs: RegExp[];
    readonly extensions: string[];
    constructor(type: string, namespacedIDs: RegExp[], extensions: string[]);
    testPath(path: string): boolean;
    getTargetPath(sourcePath: string, targetID: string): string;
}
export default ResourceFilter;
