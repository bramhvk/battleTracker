import {CmpStr, MetricRaw} from "cmpstr";
import {matcherThreshold} from "./ParserHelper";
import {CmpStrResult} from "cmpstr/dist/types/utils/Types";

export const defaultMatcher = (metric: string = "dice", flag: string = "i"): CmpStr<MetricRaw> => {
    return CmpStr.create().setMetric(metric).setFlags(flag);
}

export const getFirstWordsOfString = (string: string, number: number) => {
    return string.trim().split(/\s+/).slice(0, number).join(" ");
}

export const doesStringContainValue = (test: string, find: string, filter = (value: string) => !/[\d\W]/.test(value), threshold: number = matcherThreshold) => {
    const matcher = defaultMatcher();

    return test.trim()
        .split(/\s+/)
        .filter(filter)
        .map((value: string) => matcher.test(value, find) as CmpStrResult)
        .reduce((best, current) => {
            return current.match > best.match ? current : best;
        }, {match: -1} as CmpStrResult)


}

