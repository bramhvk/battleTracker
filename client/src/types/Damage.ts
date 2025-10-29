import {DamageType} from "./DamageType";


export interface Damage {
    die: number;
    amount: number;
    bonus: number;
    type: DamageType;
}

export const emptyDamage = {
    die: 0,
    amount: 0,
    bonus: 0,
    type: DamageType.ERROR,
}