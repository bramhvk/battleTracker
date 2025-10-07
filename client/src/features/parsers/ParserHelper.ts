import {CmpStr} from "cmpstr";
import type {CmpStrResult} from "cmpstr/dist/types/utils/Types";

export interface ParserMatch {
    keyword: string;
    index: number;
    match: number;
}

const emptyParserMatch: ParserMatch = {
    keyword: "",
    index: -1,
    match: 0,
}

export const findByKeyword = (keyword: string, parserMatches: ParserMatch[]) => {
    return parserMatches.find(pm => pm.keyword === keyword) ?? emptyParserMatch;
}

export const findBestMatchFor = (keyword: string, matcher: CmpStr, testArrays: string[], splitKeyword: boolean): ParserMatch => {
    const keywordLength: number = splitKeyword ? keyword.split(" ").length : keyword.length;

    let bestMatchScore: number = -1;
    let bestMatchIndex: number = -1;

    testArrays.forEach((text, index) => {
        const res = matcher.test(text.trim().split(/\s+/).slice(0, keywordLength).join(" "), keyword) as CmpStrResult;
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

export const findBestMatchInArray = (keywords: string[], matcher: CmpStr, testArrays: string[], splitKeyword: boolean): ParserMatch => {

    let bestMatch: ParserMatch = {
        keyword: "",
        index: -1,
        match: 0,
    }

    keywords.forEach((keyword) => {
        console.log(keyword)
        const match = findBestMatchFor(keyword, matcher, testArrays, splitKeyword);
        if (match.match > bestMatch.match) {
            bestMatch = match;
        }
    })

    return bestMatch;
}