/**
 * Structure of a blockstate file.
 */
export default interface Blockstate {
    variants?: {
        [key: string]: Model | Model[]
    },
    multipart?: Case[]
}

type Model = {
    model: string,
    x?: number,
    y?: number,
    uvlock?: boolean,
    weight?: number
}

type Case = {
    when: {
        OR?: {
            [state: string]: any
        }[],
        [state: string]: any
    },
    apply: Model | Model[]
}
