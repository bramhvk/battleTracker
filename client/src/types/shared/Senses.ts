export const sensesKeys: Array<keyof Senses> = ["perception", "darkvision", "blindsight", "tremorsense", "truesight"];

export interface Senses {
    perception?: number;
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
}

export const emptySenses: Senses = {
    perception: 0,
    darkvision: 0,
    blindsight: 0,
    tremorsense: 0,
    truesight: 0,
}