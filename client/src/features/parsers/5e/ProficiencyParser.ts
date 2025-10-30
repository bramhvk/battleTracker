import {doesStringContainValue} from "../Matcher";
import {findStringBlockFor, matcherThreshold, stripFirst} from "../ParserHelper";
import {proficienciesKeywords} from "./mapping/5eMapping";
import {statKeys} from "../../../types/shared/Stats";
import {getEnumKeys} from "../../../utils/extraction";
import {Skill} from "../../../types/shared/Skill";


export const createProficienciesFrom = (statBlock: string[]): string[] => {
    return proficienciesKeywords.map(k => stripFirst(findStringBlockFor(statBlock,k), k.value.length))
        .flatMap((s) => parseProficiencies(s));
}


export const parseProficiencies = (line: string): string[] => {
    const proficiencies: string[] = [];

    statKeys.forEach((key) => {
        if (doesStringContainValue(line, key).match > matcherThreshold) {
            proficiencies.push(key)
        }
    });

    getEnumKeys(Skill).forEach(key => {
        const tmp = doesStringContainValue(line, key)
        if (tmp.match > matcherThreshold) {
            proficiencies.push(key)
        }
    })

    return proficiencies;
}