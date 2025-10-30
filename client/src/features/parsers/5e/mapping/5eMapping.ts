import {KeywordMap, replaceNonAN} from "../../ParserHelper";
import {doesStringContainValue} from "../../Matcher";

export const MAPPING_NAME: KeywordMap = {
    value: "name",
    mappedValue: "name",
}

export const MAPPING_SIZE: KeywordMap = {
    value: "size",
    mappedValue: "size",
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


export const MAPPING_SENSES: KeywordMap = {
    value: "Senses",
    mappedValue: "senses",
}

export const MAPPING_VULNERABILITIES: KeywordMap = {
    value: "Damage vulnerabilities",
    mappedValue: "vulnerabilities"
}

export const MAPPING_RESISTANCES: KeywordMap = {
    value: "Damage resistances",
    mappedValue: "resistances"
}

export const MAPPING_IMMUNITIES: KeywordMap = {
    value: "Damage immunities",
    mappedValue: "immunities"
}

export const MAPPING_CONDITIONS: KeywordMap = {
    value: "conditions",
    mappedValue: "conditions"
}

export const MAPPING_LANGUAGES: KeywordMap = {
    value: "Languages",
    mappedValue: "languages"
}

export const MAPPING_CR: KeywordMap = {
    value: "Challenge",
    mappedValue: "cr"
}

export const MAPPING_CR_FALLBACK: KeywordMap = {
    value: "Challenge",
    mappedValue: "cr",
    matchOptions: {
        fMatch: (test, find) => doesStringContainValue(replaceNonAN(test), find),
        fFind: "XP",
    }
}

export const MAPPING_ABILITIES: KeywordMap = {
    value: "",
    mappedValue: "abilities"
}

export const MAPPING_ACTIONS: KeywordMap = {
    value: "ACTIONS",
    mappedValue: "actions",
    requireExactLength: true
}

export const MAPPING_BONUS_ACTIONS: KeywordMap = {
    value: "BONUS ACTIONS",
    mappedValue: "bActions",
    requireExactLength: true
}

export const MAPPING_LEGENDARY_ACTIONS: KeywordMap = {
    value: "LEGENDARY ACTIONS",
    mappedValue: "lActions",
    requireExactLength: true
}

export const MAPPING_REACTIONS: KeywordMap = {
    value: "REACTIONS",
    mappedValue: "reactions",
    requireExactLength: true
}

export const MAPPING_REGIONAL_EFFECTS: KeywordMap = {
    value: "REGIONAL EFFECTS",
    mappedValue: "rEffects",
    requireExactLength: true
}

export const MAPPING_SPELLCASTING: KeywordMap = {
    value: "Spellcasting",
    mappedValue: "",
}

export const STATS_ORDER: KeywordMap[] = [
    MAPPING_NAME,
    MAPPING_SIZE,
    MAPPING_AC,
    MAPPING_HIT_POINTS,
    MAPPING_SPEED,
    MAPPING_SAVING_THROWS,
    MAPPING_SKILLS,
    MAPPING_VULNERABILITIES,
    MAPPING_RESISTANCES,
    MAPPING_IMMUNITIES,
    MAPPING_CONDITIONS,
    MAPPING_SENSES,
    MAPPING_LANGUAGES,
    MAPPING_CR,
    MAPPING_CR_FALLBACK,
];

export const TRAITS_ORDER: KeywordMap[] = [
    MAPPING_ACTIONS,
    MAPPING_BONUS_ACTIONS,
    MAPPING_LEGENDARY_ACTIONS,
    MAPPING_REACTIONS,
    MAPPING_REGIONAL_EFFECTS
];

export const GenericMonsterInfoKeywords: KeywordMap[] = [MAPPING_SPEED, MAPPING_AC, MAPPING_HIT_POINTS, MAPPING_HIT_DICE, MAPPING_LANGUAGES, MAPPING_CR, MAPPING_CR_FALLBACK];
export const proficienciesKeywords: KeywordMap[] = [MAPPING_SAVING_THROWS, MAPPING_SKILLS];