import {emptyMonster, Monster} from "../../../types/Monster";
import {createGenericMonsterInfoFrom} from "./GenericMonsterInfoParser";
import {createStatsFrom} from "./StatsParsers";
import {isStringEmpty} from "../../../utils/validation";

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
    const filteredStatBlock = statBlock.filter(s => !isStringEmpty(s))

    console.log("given stat block", filteredStatBlock);
    const monster =  {
        ...emptyMonster,
        info: createGenericMonsterInfoFrom(filteredStatBlock),
        stats: createStatsFrom(filteredStatBlock),
    };
    console.log("produced", monster);
    return monster
}