import { TextComponent } from './TextComponent'
/**
 * Structure of `pack.mcmeta`.
 */
export default interface PackMcmeta {
    pack: {
        pack_format: number;
        description: TextComponent;
    }
    language?: {
        [code: string]: {
            name?: string;
            region?: string;
            bidirectional?: boolean;
        };
    }
    [key: string]: any
}
