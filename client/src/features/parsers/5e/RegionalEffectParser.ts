import {KeywordMap, ParserMatch} from "../ParserHelper";
import {Trait} from "../../../types/shared/Trait";
import {determineTextFor} from "./TraitParser";

export const createRegionalEffectFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = determineTextFor(lines, keywordMap, parserMatches);
    if (text.length <= 0) return [];

    return [{
        name: "Regional Effects",
        text: text.join("\n"),
    } as Trait]
}
