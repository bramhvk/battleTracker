import {Size} from "./Size";
import {emptyStats, Stats} from "./Stats";
import {DamageType} from "./DamageType";
import {emptyMovement, Movement} from "./Movement";
import {emptySenses, Senses} from "./Senses";
import {Condition} from "./Condition";
import {Trait} from "./Trait";

export interface Monster {
    _id: string;
    info: GenericMonsterInfo;
    stats: Stats;
    proficiencies: string[];
    senses: Senses;
    immunities: DamageType[];
    resistances: DamageType[];
    conditions: Condition[];
    languages: string;
    abilities: Trait[];
    actions: Trait[];
    bActions: Trait[];
    lActions: Trait[];
    reactions: Trait[];
    rEffects: Trait[];
}

export interface GenericMonsterInfo {
    name: string;
    ac: number;
    hitPoints: number;
    hitDice: number;
    movement: Movement;
    size: Size,
    languages: string,
    cr: number;
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
    languages: "",
    cr: 0,
}

export const emptyGenericMonsterInfo: GenericMonsterInfo = {...emptyGenericMonsterInfoObject}

export const emptyMonsterObject: Monster = {
    _id: "",
    info: emptyGenericMonsterInfo,
    stats: emptyStats,
    proficiencies: [],
    senses: emptySenses,
    immunities: [],
    resistances: [],
    conditions: [],
    languages: "",
    abilities: [],
    actions: [],
    bActions: [],
    lActions: [],
    reactions: [],
    rEffects: [],
}

export const emptyMonster: Monster = {...emptyMonsterObject}






