export const sensesKeys = ["passive_perception", "darkvision", "blindsight", "tremorsense", "truesight"] as const;

export interface Senses {
    passive_perception?: number;
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
}

export const emptySenses = {
    passive_perception: 0,
    darkvision: 0,
    blindsight: 0,
    tremorsense: 0,
    truesight: 0,
}