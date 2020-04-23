/**
 * Structure of a model file.
 */
export default interface Model {
    parent?: string,
    ambientocclusion?: boolean,
    textures?: {
        [variable: string]: string
    },
    display?: {
        thirdperson_righthand?: Display,
        thirdperson_lefthand?: Display,
        firstperson_righthand?: Display,
        firstperson_lefthand?: Display,
        gui?: Display,
        head?: Display,
        ground?: Display,
        fixed?: Display
    },
    elements?: Element[],
    overrides?: Override[],
    [other: string]: any
}

type Display = {
    rotation?: number[],
    scale?: number[],
    translation?: number[]
}

export type Direction = 'down' | 'up' | 'north' | 'south' | 'west' | 'east'

type Element = {
    from?: number[],
    to?: number[],
    rotation?: {
        origin?: number[],
        axis?: 'x' | 'y' | 'z',
        angle?: number,
        rescale?: boolean
    },
    shade?: boolean,
    faces?: {
        [direction in Direction]: Face
    },
    [other: string]: any
}

type Face = {
    uv?: number[],
    texture?: string,
    cullface?: Direction,
    rotation?: number,
    tintindex?: number
}

type Override = {
    predicate?: {
        [tag: string]: any
    },
    model?: string
}
