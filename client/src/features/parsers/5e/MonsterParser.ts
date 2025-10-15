import {emptyMonsterObject, Monster} from "../../../types/Monster";
import {createGenericMonsterInfoFrom} from "./GenericMonsterInfoParser";
import {createStatsFrom} from "./StatsParsers";
import {isStringEmpty} from "../../../utils/validation";
import {createProficienciesFrom} from "./ProficiencyParser";
import {createSensesFrom} from "./SensesParser";
import {createDamageTypesFrom} from "./DamageTypeParser";
import {MAPPING_IMMUNITIES, MAPPING_RESISTANCES, STATS_ORDER, TRAITS_ORDER} from "./mapping/5eMapping";
import {createConditionsFrom} from "./ConditionParser";
import {findBestMatchFor, findLastLine} from "../ParserHelper";
import {defaultMatcher} from "../Matcher";

export const createMonsterFrom = (data: string[]): Monster => {
    const statBlock = [...data.filter(s => !isStringEmpty(s))]

    const parserMatches = [findLastLine(statBlock, STATS_ORDER[0], true).keyword, ...TRAITS_ORDER]
        .map(k => findBestMatchFor(k, defaultMatcher(), data, true))
        .filter(p => p.match > 0.9)

    const monster = {
        ...emptyMonsterObject,
        info: createGenericMonsterInfoFrom([...statBlock]),
        stats: createStatsFrom([...statBlock]),
        proficiencies: createProficienciesFrom([...statBlock]),
        senses: createSensesFrom([...statBlock]),
        resistances: createDamageTypesFrom([...statBlock], MAPPING_RESISTANCES),
        immunities: createDamageTypesFrom([...statBlock], MAPPING_IMMUNITIES),
        conditions: createConditionsFrom([...statBlock])
    };
    console.log(parserMatches);
    console.log(data);
    console.log(monster);
    return monster;
}

