import {Size} from "../shared/Size";
import {emptyStats, Stats} from "../shared/Stats";
import {DamageType} from "../shared/DamageType";
import {emptyMovement, Movement} from "../shared/Movement";
import {emptySenses, Senses} from "../shared/Senses";
import {Condition} from "../shared/Condition";
import {Trait} from "../shared/Trait";
import {ID} from "../shared/Id";

export interface Monster extends ID {
    info: GenericMonsterInfo;
    stats: Stats;
    proficiencies: string[];
    senses: Senses;
    immunities: DamageType[];
    resistances: DamageType[];
    conditions: Condition[];
    abilities: Trait[];
    actions: Trait[];
    reactions: Trait[];
    bActions: Trait[]; //bonus actions
    lActions: Trait[]; //legendary actions
    rEffects: Trait[]; //region effects
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
    name: "",
    info: emptyGenericMonsterInfo,
    stats: emptyStats,
    proficiencies: [],
    senses: emptySenses,
    immunities: [],
    resistances: [],
    conditions: [],
    abilities: [],
    actions: [],
    bActions: [],
    lActions: [],
    reactions: [],
    rEffects: [],
}

export const emptyMonster: Monster = {...emptyMonsterObject}






