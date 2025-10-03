import {Size} from "./Size";
import {emptyStats, SavingThrows, Stats} from "./Stats";
import {DamageType} from "./DamageType";
import {emptyMovement, Movement} from "./Movement";

export interface Monster {
    _id: string;
    name: string;
    ac: number;
    hitDice: number;
    size: Size,
    movement: Movement;
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
    hitDice: number;
    size: Size,
    movement: Movement;
}

export const genericInfoFrom= (monster: Monster) => {
    return {
        name: monster.name,
        ac: monster.ac,
        hitDice: monster.hitDice,
        size: monster.size,
        movement: monster.movement,
    } as GenericMonsterInfo;
}

export const isEmpty = (monster: Monster): boolean => {
    console.log(JSON.stringify(monster) === JSON.stringify(emptyMonster))
    return JSON.stringify(monster) === JSON.stringify(emptyMonster);
}

export const emptyMonster: Monster = {
    _id: "",
    name: "",
    ac: 0,
    hitDice: 0,
    movement: emptyMovement,
    size: 4,
    stats: emptyStats,
    savingThrows: emptyStats,
    immunities: [],
    resistances: [],
}






