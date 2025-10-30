import {emptyMonsterObject, Monster} from "../../../types/monster/Monster";
import {createGenericMonsterInfoFrom} from "./GenericMonsterInfoParser";
import {createStatsFrom} from "./StatsParsers";
import {isStringEmpty} from "../../../utils/validation";
import {createProficienciesFrom} from "./ProficiencyParser";
import {createSensesFrom} from "./SensesParser";
import {createDamageTypesFrom} from "./DamageTypeParser";
import {
    MAPPING_ACTIONS,
    MAPPING_BONUS_ACTIONS,
    MAPPING_IMMUNITIES,
    MAPPING_LEGENDARY_ACTIONS,
    MAPPING_REACTIONS,
    MAPPING_REGIONAL_EFFECTS,
    MAPPING_RESISTANCES,
    STATS_ORDER,
    TRAITS_ORDER
} from "./mapping/5eMapping";
import {createConditionsFrom} from "./ConditionParser";
import {findBestMatchFor, findLastLine} from "../ParserHelper";
import {defaultMatcher} from "../Matcher";
import {createTraitsFrom} from "./TraitParser";
import {createActionsFrom} from "./ActionParser";
import {createLegendaryActionsFrom} from "./LegendaryActionParser";
import {createRegionalEffectFrom} from "./RegionalEffectParser";
import {createAbilitiesFrom} from "./AbilityParser";

export const createMonsterFrom = (data: string[]): Monster => {
    const statBlock = [...data.filter(s => !isStringEmpty(s))]

    console.log("SSSSSS", statBlock);

    const traitMatches = [findLastLine(statBlock, STATS_ORDER[0], true).keyword, ...TRAITS_ORDER]
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
        conditions: createConditionsFrom([...statBlock]),
        // abilities start after the last generic property we found (usually CR)
        abilities: createAbilitiesFrom([...data], traitMatches[0].keyword, traitMatches), //This will be mostly the trigger parser
        actions: createActionsFrom([...data], MAPPING_ACTIONS, traitMatches),
        bActions: createTraitsFrom([...data], MAPPING_BONUS_ACTIONS, traitMatches),
        reactions: createTraitsFrom([...data], MAPPING_REACTIONS, traitMatches),
        lActions: createLegendaryActionsFrom([...data], MAPPING_LEGENDARY_ACTIONS, traitMatches),
        rEffects: createRegionalEffectFrom([...data], MAPPING_REGIONAL_EFFECTS, traitMatches),
    };
    console.log(traitMatches);
    console.log(data);
    console.log(monster);
    return monster;
}

