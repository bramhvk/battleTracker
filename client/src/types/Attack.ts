import {DamageType} from "./DamageType";

export interface Attack {
    name: string;
    range: AttackRange;
    bonus: number;
    reach: string;
    target: string;
    damage: string;
    damageTypes: DamageType[];
    isMagical?: boolean;
    isSpell?: boolean;
}

export interface Spell extends Attack {
    isSpell: true;
    isMagical: true;
    level: string;
    schools: string[];
    components: string[];
    duration: string;
    castingTime: string;
    dc?: number;
    text: string;
}

export enum AttackRange {
    MELEE = "MELEE",
    RANGED = "RANGED",
    BOTH = "MELEE OR RANGED",
    ERROR = "ERROR",
}

export const getRangeFrom = (value: string): AttackRange => {
    if (!value) return AttackRange.ERROR;

    const normalized = value.trim().toUpperCase();

    const found = Object.values(AttackRange).find(
        v => v.toUpperCase() === normalized
    );

    return found ?? AttackRange.ERROR;
}