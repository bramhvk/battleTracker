import {Condition, conditions, getConditionFrom} from "../../../types/shared/Condition";
import {findStringBlockFor, parseForKeys} from "../ParserHelper";
import {MAPPING_CONDITIONS} from "./mapping/5eMapping";

export const createConditionsFrom = (statBlock: string[]): Condition[] => {
    return parseForKeys(findStringBlockFor(statBlock, MAPPING_CONDITIONS), MAPPING_CONDITIONS, conditions)
        .map(getConditionFrom)
        .filter(c => c !== Condition.ERROR);
}