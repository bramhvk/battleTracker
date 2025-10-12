import {DamageType, getDamageTypeFrom} from "../../../types/DamageType";
import {findStringBlockFor} from "../ParserHelper";
import {MAPPING_RESISTANCES} from "./mapping/5eMapping";
import {parseResistances} from "./lines/5eLineParser";


export const createResistancesFrom = (statBlock: string[]): DamageType[] => {
    //TODO: make the parser take multilpe lines + detect multiple lines
    return parseResistances(findStringBlockFor(statBlock, MAPPING_RESISTANCES)).map(getDamageTypeFrom)
}