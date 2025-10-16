import {DamageType} from "./DamageType";
import {Trait} from "./Trait";

export interface Attack extends Trait {
    range: AttackRange;
    bonus: number;
    reach: string;
    target: string;
    damageDice: string;
    amountDice: string;
    damageTypes: DamageType[];
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