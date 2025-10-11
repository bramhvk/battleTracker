import {DamageType, getDamageTypeFrom} from "../../../types/DamageType";
import {findBestMatchFor} from "../ParserHelper";
import {MAPPING_RESISTANCES} from "./mapping/5eMapping";
import {defaultMatcher} from "../Matcher";
import {parseResistances} from "./lines/5eLineParser";


export const createResistancesFrom = (statBlock: string[]): DamageType[] => {
    //TODO: make the parser take multilpe lines + detect multiple lines
    return parseResistances([statBlock[findBestMatchFor(MAPPING_RESISTANCES, defaultMatcher(), statBlock, false).index]]).map(getDamageTypeFrom)
}