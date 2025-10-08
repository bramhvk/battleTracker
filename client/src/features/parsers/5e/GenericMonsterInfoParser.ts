import {CmpStr} from "cmpstr";
import {emptyGenericMonsterInfo, GenericMonsterInfo} from "../../../types/Monster";
import {
    findBestMatchFor,
    findBestMatchInArray,
    findByKeyword,
    isBelowThreshold,
    KeywordMap,
    ParserMatch
} from "../ParserHelper";
import {getEnumKeys} from "../../../utils/extraction";
import {Size} from "../../../types/Size";
import {defaultMatcher} from "../Matcher";
import {GenericMonsterInfoKeywords, MAPPING_NAME} from "./mapping/5eMapping";
import {parseGenericMonsterInfo} from "./lines/5eLineParser";


export const createGenericMonsterInfoFrom = (statBlock: string[]): GenericMonsterInfo => {
    const matcher = defaultMatcher();
    const parserResult: ParserMatch[] = [];
    const parsedGenericInfo = emptyGenericMonsterInfo;

    //get the genericMonsterInfo
    GenericMonsterInfoKeywords.forEach((key) => parserResult.push(findBestMatchFor(key, matcher, statBlock, true)));

    //the size is always before any of the generic info, so we check less lines
    parserResult.push({...determineSize(statBlock, matcher, parserResult)})

    //the name is always the line before the size
    const sizeIndex = findByKeyword("size", parserResult).index;
    parserResult.push({keyword: MAPPING_NAME, match: 1, index: (sizeIndex - 1)})

    parserResult.forEach((res) => {
        const key = res.keyword.mappedValue as keyof GenericMonsterInfo
        (parsedGenericInfo[key] as any) = parseGenericMonsterInfo[key](statBlock[res.index], res);
    })

    return parsedGenericInfo;
}

const determineSize = (statBlock: string[], matcher: CmpStr, parserResult: ParserMatch[]) => {
    const result = findBestMatchInArray(getEnumKeys(Size).map((sizeKey) => ({value: sizeKey, mappedValue: "size"} as KeywordMap)), matcher, statBlock.slice(0, parserResult[0].index), true)

    if (isBelowThreshold(result)) {

        const hitDiceMatch = findByKeyword("hitDice", parserResult);
        const hitDiceAmount = Number(statBlock[hitDiceMatch.index].match(/\(\S*(\d{2})/)?.[1]);

        if (hitDiceAmount !== undefined && !isNaN(hitDiceAmount)) {
            //fallback to the value of the hit die in the HP section
            //assume the index is 2 away from HP, since we couldn't find the size
            return {
                keyword: {
                    value: Size[hitDiceAmount],
                    mappedValue: "size"
                } as KeywordMap,
                index: hitDiceMatch.index - 2,
                match: 1,
            } as ParserMatch

        }
    }

    return result;
}