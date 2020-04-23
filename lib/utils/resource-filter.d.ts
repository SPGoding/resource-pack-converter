export declare class ResourceFilter {
    readonly type: string;
    readonly nids: RegExp[];
    readonly extensions: string[];
    constructor(type: string, nids: RegExp[], extensions: string[]);
    testPath(path: string): boolean;
    getTargetPath(sourcePath: string, targetID: string): string;
}
export default ResourceFilter;
