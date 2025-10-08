import {KeywordMap} from "../../ParserHelper";

export const MAPPING_NAME: KeywordMap = {
    value: "name",
    mappedValue: "name",
}

export const MAPPING_AC: KeywordMap = {
    value: "armor class",
    mappedValue: "ac"
}

export const MAPPING_HIT_POINTS: KeywordMap = {
    value: "hit points",
    mappedValue: "hitPoints"
}

export const MAPPING_HIT_DICE: KeywordMap = {
    value: "hit points",
    mappedValue: "hitDice"
}

export const MAPPING_SPEED: KeywordMap = {
    value: "speed",
    mappedValue: "movement"
}

export const MAPPING_STAT_BLOCK_HEADER: KeywordMap = {
    value: "STR DEX CON INT WIS CHA",
    mappedValue: ""
}

export const MAPPING_STATS: KeywordMap = {
    value: "stats",
    mappedValue: "stats",
}

export const GenericMonsterInfoKeywords: KeywordMap[] = [MAPPING_SPEED, MAPPING_AC, MAPPING_HIT_POINTS, MAPPING_HIT_DICE]