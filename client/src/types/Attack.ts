import {Trait} from "./Trait";
import {Damage} from "./Damage";

export interface Attack extends Trait {
    type: AttackRange;
    bonus: number;
    range: string;
    reach: string;
    target: string;
    damage: Damage[];
    isMagical: boolean;
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