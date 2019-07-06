/**
 * Structure of a model file.
 */
export default interface Model {
    parent: string,
    ambientocclusion: boolean,
    textures: {
        [variable: string]: string
    },
    display: {
        thirdperson_righthand: Display,
        thirdperson_lefthand: Display,
        firstperson_righthand: Display,
        firstperson_lefthand: Display,
        gui: Display,
        head: Display,
        ground: Display,
        fixed: Display,
    },
    elements: Element[]
}

type Display = {
    rotation: number[],
    scale: number[],
    translation: number[]
}

type Element = {
    from: number[],
    to: number[],
    rotation: {
        origin: number[],
        axis: 'x' | 'y' | 'z',
        angle: number,
        rescale: boolean
    },
    shade: boolean,
    faces: {
        down: Face,
        up: Face,
        north: Face,
        south: Face,
        west: Face,
        east: Face
    }
}

type Face = {
    uv: number[],
    texture: string,
    cullface: 'down' | 'up' | 'north' | 'south' | 'west' | 'east',
    rotation: number,
    tintindex: number
}
