import {emptyStats, Stats} from "../../types/Stats";
import {emptyGenericMonsterInfo, emptyMonster, GenericMonsterInfo, Monster} from "../../types/Monster";
import {CmpStr, MetricRaw} from "cmpstr";
import {findBestMatchFor, findBestMatchInArray, findByKeyword, ParserMatch} from "./ParserHelper";
import {Size} from "../../types/Size";
import {getEnumKeys} from "../../utils/extraction";

const infoKeywords = [
    "armor class",
    "hit points",
    "speed",
];

const genericAbilities = [
    "saving throws",
    "skills",
    "damage resistances",
    "damage immunities",
    "condition immunities",
    "senses",
    "languages",
    "challenge"
];

const matcher = CmpStr.create().setMetric('dice').setFlags('i');

export const parseMonster = (statBlock: string[]): Monster => {
    let parsedMonster: Monster = emptyMonster;
    parseInfo(statBlock, matcher);
    console.log(statBlock);
    return emptyMonster;
}

export const parseInfo = (statBlock: string[], matcher: CmpStr<MetricRaw>): GenericMonsterInfo => {
    let parserResult: ParserMatch[] = [];
    let parsedGenericInfo = emptyGenericMonsterInfo;

    infoKeywords.forEach((key) => {
        parserResult.push(findBestMatchFor(key, matcher, statBlock, true));
    })

    //the size is always before any of the generic info, so we check less lines
    parserResult.push({...findBestMatchInArray(getEnumKeys(Size), matcher, statBlock.slice(0, parserResult[0].index), true), keyword: "size"})
    //the name is always the line before the size
    parserResult.push({keyword: "name", match: 1, index: findByKeyword("size", parserResult).index - 1})
    const statBlockHeader = findStatBlockHeader(statBlock);
    parserResult.push({...statBlockHeader, keyword: "stats", index: statBlockHeader.index + 1})

    console.log(parserResult);

    return parsedGenericInfo;
}

export const parseStats = (statBlock: string[]): Stats => {
    const res = findStatBlockHeader(statBlock);
    const stats:string  = statBlock[res.index]
    // first 2 numbers after a whitespace
    const statsArray = stats.match(/\s[0-9]{1,2}/g);

    if (statsArray != null && statsArray.length > 1) {
        const stats = statsArray.map((statString) => {
            // remove whitespace
            statString = statString.trim()
            // should always work due to regex
            let stat = Number(statString)
            return stat < 26 ? stat : Number(Array.from(statString)[0])
        })

        return {
            str: stats[0],
            dex: stats[1],
            con: stats[2],
            int: stats[3],
            wis: stats[4],
            cha: stats[5],
        }
    } else {
        return emptyStats;
    }
}

const findStatBlockHeader = (statBlock: string[]) => findBestMatchFor("STR DEX CON INT WIS CHA", matcher, statBlock, false);

