import {Size} from "./Size";
import {emptyStats, SavingThrows, Stats} from "./Stats";
import {DamageType} from "./DamageType";
import {emptyMovement, Movement} from "./Movement";

export interface Monster {
    _id: string;
    info: GenericMonsterInfo;
    stats: Stats;
    savingThrows: SavingThrows;
    immunities: DamageType[];
    resistances: DamageType[];
    // languages: Language[];
    // cr: number;
    // abilities: string[];
    // attacks: Attack[]
}

export interface GenericMonsterInfo {
    name: string;
    ac: number;
    hitPoints: number;
    hitDice: number;
    movement: Movement;
    size: Size,
}

export const isEmpty = (monster: Monster): boolean => {
    console.log(JSON.stringify(monster) === JSON.stringify(emptyMonster))
    return JSON.stringify(monster) === JSON.stringify(emptyMonster);
}

export const emptyGenericMonsterInfo: GenericMonsterInfo = {
    name: "",
    ac: 0,
    hitDice: 0,
    hitPoints: 0,
    movement: emptyMovement,
    size: Size.MEDIUM,
}

export const emptyMonster: Monster = {
    _id: "",
    info: emptyGenericMonsterInfo,
    stats: emptyStats,
    savingThrows: emptyStats,
    immunities: [],
    resistances: [],
}






