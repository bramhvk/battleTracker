import {CmpStr} from "cmpstr";
import {emptyGenericMonsterInfo, GenericMonsterInfo} from "../../../types/Monster";
import {
    emptyParserMatch,
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
    parserResult.push({keyword: MAPPING_NAME, match: 1, index: determineNameIndex(parserResult)})
    // parserResult.push() todo: push challenge rating with backups
    parserResult.forEach((res) => {
        const key = res.keyword.mappedValue as keyof GenericMonsterInfo
        (parsedGenericInfo[key] as any) = parseGenericMonsterInfo[key](statBlock[res.index], res);
    })

    return parsedGenericInfo;
}

const determineSize = (statBlock: string[], matcher: CmpStr, parserResult: ParserMatch[]) => {
    const enumSizeKeys = getEnumKeys(Size).map((sizeKey) => ({value: sizeKey, mappedValue: "size"} as KeywordMap));
    const result = findBestMatchInArray(enumSizeKeys, matcher, statBlock.slice(0, Math.max(...parserResult.map(res => res.index)) + 1), true, true);

    if (isBelowThreshold(result)) {

        const hitDiceMatch = findByKeyword("hitDice", parserResult);
        const hitDiceAmount = Number(statBlock[hitDiceMatch.index].match(/\(\S*(\d{2})/)?.[1]);

        if (hitDiceAmount !== undefined && !isNaN(hitDiceAmount)) {
            //fallback to the value of the hit die in the HP section
            //assume the index is 2 away from HP, since we couldn't find the size
            return {
                ...emptyParserMatch,
                keyword: {
                    value: Size[hitDiceAmount],
                    mappedValue: "size"
                } as KeywordMap,
            } as ParserMatch

        }
    }

    return result;
}

const determineNameIndex = (parserResult: ParserMatch[]): number => {
    const sizeIndex = findByKeyword("size", parserResult).index;

    //should normally be the line before size
    if (sizeIndex > 0) {
        return sizeIndex - 1;
    }

    //next line if size isn't present
    const acIndex = findByKeyword("ac", parserResult).index;
    if (acIndex > 0) {
        return acIndex - 1;
    }

    //hope it is the first line
    return 0;
}