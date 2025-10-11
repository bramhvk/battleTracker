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

export const MAPPING_SAVING_THROWS: KeywordMap = {
    value: "Saving Throws",
    mappedValue: "proficiencies"
}

export const MAPPING_SKILLS: KeywordMap = {
    value: "Skills",
    mappedValue: "proficiencies",
}

export const MAPPING_CR: KeywordMap = {
    value: "Challenge",
    mappedValue: "cr"
}

export const MAPPING_SENSES: KeywordMap = {
    value: "Senses",
    mappedValue: "senses",
}

export const MAPPING_RESISTANCES = {
    value: "Damage resistances",
    mappedValue: "resistances"
}

export const MAPPING_IMMUNITIES = {
    value: "immunities",
    mappedValue: "immunities"
}

export const MAPPING_CONDITIONS = {
    value: "conditions",
    mappedValue: "conditions"
}

export const GenericMonsterInfoKeywords: KeywordMap[] = [MAPPING_SPEED, MAPPING_AC, MAPPING_HIT_POINTS, MAPPING_HIT_DICE];
export const ProficiencyKeywords: KeywordMap[] = [MAPPING_SAVING_THROWS, MAPPING_SKILLS];