import {defaultMatcher} from "../Matcher";
import {findBestMatchFor} from "../ParserHelper";
import {ProficiencyKeywords} from "./mapping/5eMapping";
import {parseProficiencies} from "./lines/5eLineParser";


export const createProficienciesFrom = (statBlock: string[]): string[] => {
    const matcher = defaultMatcher();

    //get Skills and SavingThrows
    return ProficiencyKeywords
        .map((key) => findBestMatchFor(key, matcher, statBlock, false))
        .flatMap((parserMatch) => parseProficiencies(statBlock[parserMatch.index]));
}