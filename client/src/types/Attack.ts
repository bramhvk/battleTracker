export interface Attack {
    name: string;
    range: AttackRange;
    bonus: number;
    reach: number;
    //target
    damage: string[];
    isMagical: boolean;
}

export enum AttackRange {
    MELEE = "MELEE",
    RANGED = "RANGED",
    M_RANGED = "M_RANGED",
    M_TOUCH = "M_TOUCH",
}