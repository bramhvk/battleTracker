import {KeywordMap, mergeMultiLines, ParserMatch} from "../ParserHelper";
import {Trait} from "../../../types/shared/Trait";
import {emptyTrigger, Trigger} from "../../../types/shared/Trigger";

export const determineTextFor = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): string[] => {
    if (!parserMatches.find(pm => pm.keyword === keywordMap)) return [];

    return mergeMultiLines(
        split(getTextFor(keywordMap, lines, parserMatches)).map(s => s.join(" ")).filter(s => s.length),
        (text: string) => text.split(/\s+/).slice(0, 5).join(" ").includes(".")
    );
}
export const createTraitsFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = determineTextFor(lines, keywordMap, parserMatches);
    if (text.length <= 0) return [];

    return [...text].map(parseTextOnlyTrait);
}

export const getTextFor = (keywordMap: KeywordMap, lines: string[], parserMatches: ParserMatch[]) => {
    const index = parserMatches.findIndex(p => p.keyword === keywordMap);

    if (index + 1 === parserMatches.length) {
        return lines.slice(parserMatches[index].index + 1)
    } else {
        return lines.slice(parserMatches[index].index + 1, parserMatches[index + 1].index);
    }
}

export const split = (lines: string[]): string[][] => {
    return lines.reduce<string[][]>((acc, line) => {
        if (line.trim() === "") acc.push([]);
        else (acc[acc.length - 1] || acc[acc.push([]) - 1]).push(line);
        return acc;
    }, [])
}

export const parseTextOnlyTrait = (text: string) => {
    const split = text.split(".");
    return {
        name: split[0].trim(),
        text: split.slice(1).map(s => s.trim()).join(" ").trim()
    } as Trait
};

export const parseTrigger = (line: string): Trigger => {
    return emptyTrigger;
}