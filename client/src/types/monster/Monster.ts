import {emptyStats, Stats} from "../shared/Stats";
import {DamageType} from "../shared/DamageType";
import {emptySenses, Senses} from "../shared/Senses";
import {Condition} from "../shared/Condition";
import {Trait} from "../shared/Trait";
import {ID} from "../shared/Id";
import {emptyGenericInfo, GenericInfo} from "../shared/GenericInfo";

export interface Monster extends ID {
    info: GenericInfo;
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

export const isEmpty = (monster: Monster): boolean => {
    console.log(JSON.stringify(monster) === JSON.stringify(emptyMonster))
    return JSON.stringify(monster) === JSON.stringify(emptyMonster);
}

export const emptyMonsterObject: Monster = {
    _id: "", // add random uuid placeholder
    name: "",
    info: emptyGenericInfo,
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






