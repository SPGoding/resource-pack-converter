import Logger from './utils/logger';
import { Conversion } from './conversions/conversion';
/**
 * The options for converter.
 */
export interface ConverterOptions {
    /**
     * Redirects output files to the directory.
     */
    outDir: string;
    /**
     * Specifies the *conversion* to use.
     */
    conversion: Conversion;
}
/**
 * Converts the input resource pack folder.
 * @param src The path of input resource pack folder.
 * @param options The options.
 */
export declare function convert(src: string, options: ConverterOptions): Promise<Logger>;
export default convert;
