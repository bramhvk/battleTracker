import {CmpStr} from "cmpstr";
import {CmpStrResult} from "cmpstr/dist/types/utils/Types";

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

export const matcherThreshold = 0.6;

export const isBelowThreshold = (parserMatch: ParserMatch) => {
    return matcherThreshold > parserMatch.match;
};

export const findByKeyword = (keyword: string, parserMatches: ParserMatch[]) => {
    return parserMatches.find(pm => pm.keyword.value === keyword || pm.keyword.mappedValue === keyword) ?? emptyParserMatch;
}

const getTextToTest = (text: string, substringFrom: number, substringUntil: number, keywordLength: number) => {
    if (substringUntil > 0) {
        return text.substring(substringFrom, substringUntil);
    } else {
        return text.trim().split(/\s+/).slice(0, keywordLength).join(" ")
    }
};

export const findBestMatchFor = (keyword: KeywordMap,
                                 matcher: CmpStr,
                                 testArrays: string[],
                                 splitKeyword: boolean,
                                 substringKeywordLength: boolean = false,
                                 substringUntil = -1,
                                 substringFrom = 0): ParserMatch => {
    const keywordLength: number = splitKeyword ? keyword.value.split(" ").length : keyword.value.length;
    if (substringKeywordLength) {
        substringUntil = keyword.value.length;
    }

    let bestMatchScore: number = -1;
    let bestMatchIndex: number = -1;

    testArrays.forEach((text, index) => {
        const res = matcher.test(getTextToTest(text, substringFrom, substringUntil, keywordLength), keyword.value) as CmpStrResult;
        if (res.match > bestMatchScore) {
            // console.log(text, bestMatchScore, bestMatchIndex)
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

export const findBestMatchInArray = (keywords: KeywordMap[],
                                     matcher: CmpStr, testArrays: string[],
                                     splitKeyword: boolean,
                                     substringKeywordLength: boolean = false,
                                     substringUntil: number = -1,
                                     substringFrom: number = 0): ParserMatch => {
    let bestMatch: ParserMatch = emptyParserMatch

        keywords.forEach((keyword) => {
            const match = findBestMatchFor(keyword, matcher, testArrays, splitKeyword, substringKeywordLength, substringUntil, substringFrom);
            if (match.match > bestMatch.match) {
                bestMatch = match;
            }
        })

    return bestMatch;
}