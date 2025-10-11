import {defaultMatcher} from "../Matcher";
import {Senses} from "../../../types/Senses";
import {findBestMatchFor} from "../ParserHelper";
import {MAPPING_SENSES} from "./mapping/5eMapping";
import {parseSenses} from "./lines/5eLineParser";


export const createSensesFrom = (statBlock: string[]): Senses => {
    const matcher = defaultMatcher();

    return parseSenses(statBlock[findBestMatchFor(MAPPING_SENSES, matcher, statBlock, false, true).index]);
}