import {matcherThreshold, ParserMatch} from "../../ParserHelper";
import {GenericMonsterInfo} from "../../../../types/Monster";
import {getSizeFromString} from "../../../../types/Size";
import {emptyMovement, Movement, movementKeys} from "../../../../types/Movement";
import {defaultMatcher} from "../../Matcher";
import type {CmpStrResult} from "cmpstr/dist/types/utils/Types";
import {isStringEmpty} from "../../../../utils/validation";

//parser functions
type GenericMonsterInfoParserFunction = (line: string, parserMatch: ParserMatch) => any;

export const parseGenericMonsterInfo: Record<keyof GenericMonsterInfo, GenericMonsterInfoParserFunction> = {
    name: (l) => l,
    ac: (l) => l.match(/[^\d]*([0-9]+)/)?.[1] ?? 0,
    hitPoints: (l) => l.match(/[^\d]*([0-9]+)/)?.[1] ?? 0,
    hitDice: (l) => l.match(/(?:\D*\d+\D*)(\d+)/)?.[1] ?? 0,
    movement: (l) => parseMovement(l),
    size: (_, p) => getSizeFromString(p.keyword.value) ?? 0,
};

export const parseMovement = (line: string): Movement => {
    const matcher = defaultMatcher();
    const result = emptyMovement;
    const speeds = line.split("ft").map(l => l.replace(/[^a-zA-Z0-9\s]/, "")).filter(s => !isStringEmpty(s));


    //naive implementation assumes we'll not have stray spaces
    //TODO: improve this? it adds fly even if only 1 line is given for some reason, (grinstagger)
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
            if (bestKeyMatch === "fly" && speedElements.length > 2 && (matcher.test("hover", speedElements[2]) as CmpStrResult).match > matcherThreshold) {
                bestKeyMatch = "hover" as keyof Movement
            }
            const value = Number(speedElements?.[1]);
            result[bestKeyMatch as keyof Movement] = Number.isNaN(value) ? 0 : value;
        }
    })

    return result;
}