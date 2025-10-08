export const statKeys = ["str", "dex", "con", "int", "wis", "cha"] as const;

export interface Stats {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export interface SavingThrows extends Stats {}

const emptyStatsObject = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
}
export const emptyStats = {...emptyStatsObject}

const emptySavingThrowsObject = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
}

export const emptySavingThrows = {...emptySavingThrowsObject}