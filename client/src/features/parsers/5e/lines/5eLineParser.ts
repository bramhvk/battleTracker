import {matcherThreshold, ParserMatch} from "../../ParserHelper";
import {GenericMonsterInfo} from "../../../../types/Monster";
import {getSizeFromString} from "../../../../types/Size";
import {emptyMovement, Movement, movementKeys} from "../../../../types/Movement";
import {defaultMatcher, doesStringContainValue} from "../../Matcher";
import type {CmpStrResult} from "cmpstr/dist/types/utils/Types";
import {isStringEmpty} from "../../../../utils/validation";
import {statKeys} from "../../../../types/Stats";
import {getEnumKeys} from "../../../../utils/extraction";
import {Skill} from "../../../../types/Skill";
import {emptySenses, Senses, sensesKeys} from "../../../../types/Senses";
import {damageTypes} from "../../../../types/DamageType";

//parser functions
type GenericMonsterInfoParserFunction = (line: string, parserMatch: ParserMatch) => any;

export const parseGenericMonsterInfo: Record<keyof GenericMonsterInfo, GenericMonsterInfoParserFunction> = {
    name: (l) => l,
    ac: (l) => l.match(/[^\d]*([0-9]+)/)?.[1] ?? 0,
    hitPoints: (l) => l.match(/[^\d]*([0-9]+)/)?.[1] ?? 0,
    hitDice: (l) => l.match(/(?:\D*\d+\D*)(\d+)/)?.[1] ?? 0,
    movement: (l) => parseMovement(l),
    size: (_, p) => getSizeFromString(p.keyword.value) ?? 0,
    cr: (l) => parseChallengeRating(l),
};

export const parseMovement = (line: string): Movement => {
    const matcher = defaultMatcher();
    const result = emptyMovement;
    const speeds = line.split("ft").map(l => l.replace(/[^a-zA-Z0-9\s]/, "")).filter(s => !isStringEmpty(s));


    //naive implementation assumes we'll not have stray spaces
    speeds.forEach((speed) => {

        const speedElements = speed.trim().split(" ");
        let bestKeyMatch = "";
        let bestMatchScore: number = matcherThreshold;

        movementKeys.forEach(key => {
            const res = matcher.test(speedElements[0], key) as CmpStrResult
            if (res.match > bestMatchScore) {
                bestMatchScore = res.match;
                bestKeyMatch = key;
            }
        })

        if (!isStringEmpty(bestKeyMatch)) {
            //hover speed is a type of flying, so we try to catch that here
            const value = bestKeyMatch === "hover" ? 1 : Number(speedElements?.[1]);

            result[bestKeyMatch as keyof Movement] = Number.isNaN(value) ? 0 : value;
        }
    })

    return result;
}

export const parseProficiencies = (line: string): string[] => {
    const proficiencies: string[] = [];

    console.log("proficiency lines", line)
    statKeys.forEach((key) => {
        if (doesStringContainValue(line, key).match > matcherThreshold) {
            proficiencies.push(key)
        }
    });

    getEnumKeys(Skill).forEach(key => {
        if (doesStringContainValue(line, key).match > matcherThreshold) {
            proficiencies.push(key)
        }

    })

    return proficiencies;
}

export const parseResistances = (lines: string[]): string[] => {
    const resistances: string[] = [];

    lines.forEach((line) => {
        resistances.push(...damageTypes.filter(type => doesStringContainValue(line, type).match > matcherThreshold));
    })

    return resistances;
}

//TODO: passive perception will be calced based on prof and wis calculations
export const parseSenses = (line: string): Senses => {
    const result = emptySenses;
    const senses = line.slice(6, line.length).split("ft") // remove 'senses ' and split the string
        .map(l => l.replace(/[^a-zA-Z0-9\s]/, ""))
        .filter(s => !isStringEmpty(s));

    senses.forEach(sense => {
        const senseElements = sense.trim().split(" ");
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

export const parseChallengeRating = (l: string) => {
    return l.match(/[\d{1,2}]/)?.[1] ?? 0;
}