export const sensesKeys = ["passivePerception", "darkvision", "blindsight", "tremorsense", "truesight"] as const;

export interface Senses {
    passivePerception?: number;
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
}

export const emptySenses = {
    passivePerception: 0,
    darkvision: 0,
    blindsight: 0,
    tremorsense: 0,
    truesight: 0,
}