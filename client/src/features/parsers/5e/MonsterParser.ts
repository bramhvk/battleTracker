import {emptyMonster, Monster} from "../../../types/Monster";
import {createGenericMonsterInfoFrom} from "./GenericMonsterInfoParser";
import {createStatsFrom} from "./StatsParsers";
import {isStringEmpty} from "../../../utils/validation";
import {createProficienciesFrom} from "./ProficiencyParser";
import {createSensesFrom} from "./SensesParser";
import {createResistancesFrom} from "./ResistanceParser";

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

export const createMonsterFrom = (data: string[]): Monster => {
    const statBlock = [...data.filter(s => !isStringEmpty(s))]

    const monster = {
        ...emptyMonster,
        info: createGenericMonsterInfoFrom([...statBlock]),
        stats: createStatsFrom([...statBlock]),
        proficiencies: createProficienciesFrom([...statBlock]),
        senses: createSensesFrom([...statBlock]),
        resistances: createResistancesFrom([...statBlock]),
    };

    console.log(monster);
    return monster;
}

