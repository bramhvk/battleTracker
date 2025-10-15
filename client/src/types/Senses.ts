export const sensesKeys = ["perception", "darkvision", "blindsight", "tremorsense", "truesight"] as const;

export interface Senses {
    perception?: number;
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
}

export const emptySenses = {
    perception: 0,
    darkvision: 0,
    blindsight: 0,
    tremorsense: 0,
    truesight: 0,
}