import {DamageType, damageTypes, getDamageTypeFrom} from "../../../types/shared/DamageType";
import {findStringBlockFor, KeywordMap, parseForKeys} from "../ParserHelper";

export const createDamageTypesFrom = (statBlock: string[], keywordMap: KeywordMap): DamageType[] => {
    return parseForKeys(findStringBlockFor(statBlock, keywordMap), keywordMap, damageTypes)
        .map(getDamageTypeFrom)
        .filter(dt => dt !== DamageType.ERROR)
}