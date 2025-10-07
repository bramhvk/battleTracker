import {CmpStr, MetricRaw} from "cmpstr";
import {emptyGenericMonsterInfo, GenericMonsterInfo} from "../../../types/Monster";
import {findBestMatchFor, findBestMatchInArray, findByKeyword, KeywordMap, ParserMatch} from "../ParserHelper";
import {getEnumKeys} from "../../../utils/extraction";
import {Size} from "../../../types/Size";
import {defaultMatcher} from "../Matcher";
import {GenericMonsterInfoKeywords, MAPPING_NAME, MAPPING_STAT_BLOCK_HEADER} from "./mapping/5eMapping";


export const createGenericMonsterInfoFrom = (statBlock: string[]): GenericMonsterInfo => {
    const matcher = defaultMatcher();
    const statBlockHeader = findStatBlockHeader(statBlock, matcher);

    let parserResult: ParserMatch[] = [];
    let parsedGenericInfo = emptyGenericMonsterInfo;

    //get the genericMonsterInfo
    GenericMonsterInfoKeywords.forEach((key) => parserResult.push(findBestMatchFor(key, matcher, statBlock, true)));

    //the size is always before any of the generic info, so we check less lines
    parserResult.push({...findBestMatchInArray(getEnumKeys(Size).map((sizeKey) => ({value: sizeKey, mappedValue: "size"} as KeywordMap)), matcher, statBlock.slice(0, parserResult[0].index), true)})
    //the name is always the line before the size
    parserResult.push({keyword: MAPPING_NAME, match: 1, index: findByKeyword("size", parserResult).index - 1})

    // parserResult.push({...statBlockHeader, keyword: MAPPING_STATS, index: statBlockHeader.index + 1})

    parserResult.forEach((res) => {
        const a = res.keyword.mappedValue as keyof GenericMonsterInfo
        (parsedGenericInfo[a] as any) = "test"
    })

    console.log(parserResult, parsedGenericInfo);

    return parsedGenericInfo;
}

export const findStatBlockHeader = (statBlock: string[],  matcher: CmpStr<MetricRaw>) => findBestMatchFor(MAPPING_STAT_BLOCK_HEADER, matcher, statBlock, false);
