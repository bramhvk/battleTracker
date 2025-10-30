import {CmpStr} from "cmpstr";
import {CmpStrResult} from "cmpstr/dist/types/utils/Types";
import {STATS_ORDER} from "./5e/mapping/5eMapping";
import {defaultMatcher, doesStringContainValue} from "./Matcher";
import {isStringEmpty, isStringNotEmpty} from "../../utils/validation";

export interface ParserMatch {
    keyword: KeywordMap;
    index: number;
    match: number;
}

export interface KeywordMap {
    mappedValue: string;
    value: string;
    matchOptions?: {
        fMatch: (test: string, find: string) => {},
        fFind: string,
    },
    requireExactLength?: boolean,
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

export const matcherThreshold = 0.75;

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
        //perform default matching or use the one provided in the options
        const res = !!keyword.matchOptions?.fMatch
            ? keyword.matchOptions.fMatch(text, keyword.matchOptions?.fFind) as CmpStrResult
            : matcher.test(getTextToTest(text, substringFrom, substringUntil, keywordLength), keyword.value) as CmpStrResult;

        if (res.match > bestMatchScore && isLineLegal(text, keyword)) {
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

const isLineLegal = (line: string, keyWord: KeywordMap) => {
    if (keyWord.requireExactLength) {
        return keyWord.value.length === line.trim().length;
    }
    return true
};

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

export const findStringBlockFor = (statBlock: string[], keywordMap: KeywordMap): string => {
    const bestMatch = findBestMatchFor(keywordMap, defaultMatcher(), statBlock, false, true, keywordMap.value.length);
    const lastLine = findLastLine(statBlock, keywordMap);
    return statBlock.slice(bestMatch.index, lastLine.index).join(" ");
}

export const findLastLine = (statBlock: string[], keywordMap: KeywordMap, reverse = false): ParserMatch => {
    let nextParserMatch = emptyParserMatch;

    (reverse ? [...STATS_ORDER].reverse() : STATS_ORDER)
        .slice(STATS_ORDER.findIndex(m => m.value === keywordMap.value) + Number(!reverse), STATS_ORDER.length)
        .find(m => {
            const tmp = findBestMatchFor(m, defaultMatcher(), statBlock, false, true, m.value.length);
            nextParserMatch = tmp;
            return tmp.match > matcherThreshold
        });

    return nextParserMatch;
}

export const stripFirst = (line: string, characters: number) => {
    return line.slice(characters, line.length)
}

export const parseForKeys = (line: string, keywordMap: KeywordMap, keys: string[]): string[] => {
    const results: string[] = [];

    if (line.length) {
        //cleanup given strings
        line = stripFirst(line, keywordMap.value.length)

        line.split(" ").filter(isStringNotEmpty).forEach(word => {
            results.push(
                ...keys.filter(type => {
                        return doesStringContainValue(replaceNonAN(word), type.replace("_", " ")).match > matcherThreshold;
                    })
            );
        });

    }

    return results;
}

export const mergeMultiLines = (text: string[], condition: (text: string) => boolean): string[] => {
    return text.reduce<string[]>((acc, current) => {
        if (acc.length && !condition(current)) {
            acc[acc.length - 1] += " " + current.trim();
        } else {
            acc.push(current.trim());
        }
        return acc;
    }, []);
}

export const splitDistances = (line: string): string[] => {
    return line.split("ft")
        .map(l => replaceNonAN(l))
        .map(s => s.replace(",","").trim())
        .filter(s => !isStringEmpty(s));
}

export const replaceNonAN = (line: string) => {
    return line.replace(/[^a-zA-Z0-9\s]/g, "");
}