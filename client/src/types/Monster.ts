import {Size} from "./Size";
import {emptySavingThrows, emptyStats, SavingThrows, Stats} from "./Stats";
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

const emptyGenericMonsterInfoObject: GenericMonsterInfo = {
    name: "",
    ac: 0,
    hitDice: 0,
    hitPoints: 0,
    movement: emptyMovement,
    size: Size.MEDIUM,
}

export const emptyGenericMonsterInfo: GenericMonsterInfo = {...emptyGenericMonsterInfoObject}

const emptyMonsterObject: Monster = {
    _id: "",
    info: emptyGenericMonsterInfo,
    stats: emptyStats,
    savingThrows: emptySavingThrows,
    immunities: [],
    resistances: [],
}

export const emptyMonster: Monster = {...emptyMonsterObject}






