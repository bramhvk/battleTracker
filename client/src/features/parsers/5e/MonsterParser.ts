import {emptyMonster, Monster} from "../../../types/Monster";
import {createGenericMonsterInfoFrom} from "./GenericMonsterInfoParser";

const genericAbilities = [
    "saving throws",
    "skills",
    "damage resistances",
    "damage immunities",
    "condition immunities",
    "senses",
    "languages",
    "challenge"
];

export const createMonsterFrom = (statBlock: string[]): Monster => {
    return {
        ...emptyMonster,
        info: createGenericMonsterInfoFrom(statBlock),
        // stats: parseStats(statBlock),
    };
}