import {CmpStr} from "cmpstr";
import type {CmpStrResult} from "cmpstr/dist/types/utils/Types";

export interface ParserMatch {
    keyword: KeywordMap;
    index: number;
    match: number;
}

export interface KeywordMap {
    mappedValue: string;
    value: string;
}

export const emptyKeywordMap: KeywordMap = {
    value: "",
    mappedValue: "",
}

export const emptyParserMatch: ParserMatch = {
    keyword: emptyKeywordMap,
    index: -1,
    match: 0,
}



export const findByKeyword = (keyword: string, parserMatches: ParserMatch[]) => {
    return parserMatches.find(pm => pm.keyword.value === keyword) ?? emptyParserMatch;
}

export const findBestMatchFor = (keyword: KeywordMap, matcher: CmpStr, testArrays: string[], splitKeyword: boolean): ParserMatch => {
    const keywordLength: number = splitKeyword ? keyword.value.split(" ").length : keyword.value.length;

    let bestMatchScore: number = -1;
    let bestMatchIndex: number = -1;

    testArrays.forEach((text, index) => {
        const res = matcher.test(text.trim().split(/\s+/).slice(0, keywordLength).join(" "), keyword.value) as CmpStrResult;
        if (res.match > bestMatchScore) {
            bestMatchScore = res.match;
            bestMatchIndex = index;
        }
    })

    return {
        keyword: keyword,
        index: bestMatchIndex,
        match: bestMatchScore
    } as ParserMatch;
}

export const findBestMatchInArray = (keywords: KeywordMap[], matcher: CmpStr, testArrays: string[], splitKeyword: boolean): ParserMatch => {

    let bestMatch: ParserMatch = emptyParserMatch

    keywords.forEach((keyword) => {
        const match = findBestMatchFor(keyword, matcher, testArrays, splitKeyword);
        if (match.match > bestMatch.match) {
            bestMatch = match;
        }
    })

    return bestMatch;
}