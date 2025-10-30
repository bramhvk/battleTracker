import {KeywordMap, ParserMatch} from "../ParserHelper";
import {Trait} from "../../../types/shared/Trait";
import {determineTextFor, parseTextOnlyTrait} from "./TraitParser";


export const createAbilitiesFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = determineTextFor(lines, keywordMap, parserMatches);
    if (text.length <= 0) return [];

    const spellCastingText = [...text]
        .filter(parseSpellCasting)

    const other= [...text]
        // .filter(...)
        .map(parseTextOnlyTrait);

    return [

        ...other,
    ];
}

const parseSpellCasting = (line: string) => {
    return line.match(/Spellcasting/i);
}