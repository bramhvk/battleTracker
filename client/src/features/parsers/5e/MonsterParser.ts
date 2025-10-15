import {emptyMonsterObject, Monster} from "../../../types/Monster";
import {createGenericMonsterInfoFrom} from "./GenericMonsterInfoParser";
import {createStatsFrom} from "./StatsParsers";
import {isStringEmpty} from "../../../utils/validation";
import {createProficienciesFrom} from "./ProficiencyParser";
import {createSensesFrom} from "./SensesParser";
import {createDamageTypesFrom} from "./DamageTypeParser";
import {MAPPING_ACTIONS, MAPPING_IMMUNITIES, MAPPING_RESISTANCES, STATS_ORDER, TRAITS_ORDER} from "./mapping/5eMapping";
import {createConditionsFrom} from "./ConditionParser";
import {findBestMatchFor, findLastLine} from "../ParserHelper";
import {defaultMatcher} from "../Matcher";
import {createTraitsFrom} from "./TraitParser";

export const createMonsterFrom = (data: string[]): Monster => {
    const statBlock = [...data.filter(s => !isStringEmpty(s))]

    const traitMatches = [findLastLine(statBlock, STATS_ORDER[0], true).keyword, ...TRAITS_ORDER]
        .map(k => findBestMatchFor(k, defaultMatcher("dice",""), data, true))
        .filter(p => p.match > 0.9)

    const monster = {
        ...emptyMonsterObject,
        info: createGenericMonsterInfoFrom([...statBlock]),
        stats: createStatsFrom([...statBlock]),
        proficiencies: createProficienciesFrom([...statBlock]),
        senses: createSensesFrom([...statBlock]),
        resistances: createDamageTypesFrom([...statBlock], MAPPING_RESISTANCES),
        immunities: createDamageTypesFrom([...statBlock], MAPPING_IMMUNITIES),
        conditions: createConditionsFrom([...statBlock]),
        actions: createTraitsFrom([...data], MAPPING_ACTIONS, traitMatches),
    };
    console.log(traitMatches);
    console.log(data);
    console.log(monster);
    return monster;
}

