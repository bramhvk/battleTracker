import {emptyStats, statKeys, Stats} from "../../../types/shared/Stats";
import {defaultMatcher} from "../Matcher";
import {CmpStr, MetricRaw} from "cmpstr";
import {findBestMatchFor} from "../ParserHelper";
import {MAPPING_STAT_BLOCK_HEADER} from "./mapping/5eMapping";

export const createStatsFrom = (statBlock: string[]): Stats => {
    const result = emptyStats;
    //Use the block after the stats header STR/DEX/...
    statBlock[findStatBlockHeader(statBlock, defaultMatcher()).index + 1].split(" ")
        .filter(s => s.match(/^\d{1,2}/))
        .forEach((s, i) => {
            const extractedValue = Number(s.trim().match(/[0-9]{1,2}/g)?.[0])
            result[statKeys[i] as keyof Stats] = isNaN(extractedValue) ? 0 : extractedValue;
        })

    return result;
}

export const findStatBlockHeader = (statBlock: string[], matcher: CmpStr<MetricRaw>) => findBestMatchFor(MAPPING_STAT_BLOCK_HEADER, matcher, statBlock, false);