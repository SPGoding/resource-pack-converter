/**
 * Structure of text components.
 */
export type TextComponent = string | boolean | number | TextComponentObject | TextComponentObject[]
export default TextComponent

/**
 * Structure of text component objects.
 */
interface TextComponentObject {
    text?: string
    translate?: string
    score?: {
        name?: string;
        objective?: string;
        value?: string;
    }
    selector?: string
    keybind?: string
    nbt?: string
    with?: TextComponent[]
    interpret?: boolean
    block?: string
    entity?: string
    color?: string
    bold?: boolean
    italic?: boolean
    underlined?: boolean
    strikethrough?: boolean
    obfuscated?: boolean
    insertion?: string
    clickEvent?: {
        action?: 'open_url' | 'open_file' | 'run_command' | 'change_page' | 'suggest_command';
        value?: string;
    }
    hoverEvent?: {
        action?: 'show_text' | 'show_item' | 'show_entity';
        value?: string | TextComponent;
    }
    extra?: TextComponentObject | TextComponentObject[]
    [key: string]: any
}
