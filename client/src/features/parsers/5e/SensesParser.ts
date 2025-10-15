import {defaultMatcher} from "../Matcher";
import {emptySenses, Senses, sensesKeys} from "../../../types/Senses";
import {findStringBlockFor, matcherThreshold, splitDistances, stripFirst} from "../ParserHelper";
import {MAPPING_SENSES} from "./mapping/5eMapping";
import {isStringEmpty} from "../../../utils/validation";
import type {CmpStrResult} from "cmpstr/dist/types/utils/Types";


export const createSensesFrom = (statBlock: string[]): Senses => {
    return parseSenses(findStringBlockFor(statBlock, MAPPING_SENSES));
}


//TODO: passive perception will be calced based on prof and wis calculations
const parseSenses = (line: string): Senses => {
    const result = emptySenses;

    const senses = splitDistances(stripFirst(line, 6));

    senses.forEach(sense => {
        let senseElements = sense.trim().split(" ");

        if (senseElements.length > 2) {
            // ignore the 'passive' word if present
            senseElements = [...senseElements.slice(1)];
        }

        let bestKeyMatch = "";
        let bestMatchScore: number = matcherThreshold;

        sensesKeys.forEach((key) => {
            const res = defaultMatcher().test(senseElements[0], key) as CmpStrResult
            if (res.match > bestMatchScore) {
                bestMatchScore = res.match;
                bestKeyMatch = key;
            }
        })

        if (!isStringEmpty(bestKeyMatch)) {
            const value = Number(senseElements?.[1])
            result[bestKeyMatch as keyof Senses] =  Number.isNaN(value) ? 0 : value;
        }

    })

    return result;
}