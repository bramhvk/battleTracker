import {findBestMatchFor, KeywordMap, ParserMatch} from "../ParserHelper";
import {emptyTrait, Trait} from "../../../types/shared/Trait";
import {determineTextFor, parseTextOnlyTrait, parseTrigger} from "./TraitParser";
import {Attack, AttackRange, getRangeFrom} from "../../../types/shared/Attack";
import {Damage, emptyDamage} from "../../../types/shared/Damage";
import {getDamageTypeFrom} from "../../../types/shared/DamageType";
import {MAPPING_SPELLCASTING} from "./mapping/5eMapping";
import {defaultMatcher} from "../Matcher";


export const createActionsFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = determineTextFor(lines, keywordMap, parserMatches);
    if (text.length <= 0) return [];

    const traits: Trait[] = []

    const spellcasting = findBestMatchFor(MAPPING_SPELLCASTING, defaultMatcher("damerau"), [...text], false, true);

    if (spellcasting.match > .8) {
        //remove it so we don't process it again
        traits.push({name:"spellcasting", text: text[spellcasting.index]} as Trait);
        text.splice(spellcasting.index, 1)
    }

    traits.push(...[...text].filter(filterMultiAttack).map(parseTextOnlyTrait));
    traits.push(...[...text].map(parseAttack).filter((a): a is RegExpMatchArray => a !== null).map((a) => createAttackTrait(a)));
    traits.push(...[...text].filter((string) => !filterMultiAttack(string) && parseAttack(string) === null).map(parseTextOnlyTrait))

    return traits;
}

const createAttackTrait = (match: RegExpMatchArray): Trait => {
    const trigger = parseTrigger(match[8]); //TODO: maybe scrub everything afterwards to determine triggers

    return {
        ...emptyTrait,
        name: match.groups?.name,
        text: match[0],
        range: match.groups?.range ? match.groups?.rangeDist : "",
        reach: match.groups?.reach ? match.groups?.reachDist : "",
        type: match.groups?.type ? getRangeFrom(match.groups?.type) : AttackRange.ERROR,
        bonus: Number(match.groups?.bonus ?? 0),
        target: match.groups?.target,
        damage: parseDamage(match.groups?.damage),
        isMagical: match.groups?.isMagic.toLowerCase() === "spell",
        triggers: []
    } as Attack;
}

const filterMultiAttack = (line: string) => {
    return line.match(/MultiAttack./i);
}

const parseAttack = (line: string) => {
    // @ts-ignore
    return line.match(/^(?<name>[A-Z][\w\s'-\(\)]+)\.\s*(?<type>Melee|Ranged|Melee or Ranged)\s+(?<isMagic>Weapon|Spell)+\s+Attack:\s*(?<bonus>[+–-]?\d+)\s*to hit[,.]{1,2}\s(?<reach>Reach)?\s?(?<reachDist>\d+|[\d\/]+)?\s?(?:ft[,.]{1,2})?\s?(?:or)?\s?(?<range>Range)?\s?(?<rangeDist>[\d\/]*)?\s*(?:ft[,.]{1,2})?\s*(?<target>[\w\s,)(]*?)\.\s*Hit:?\s*(?<damage>[\d\s\w()+\-]+)\s*damage\.?\s*(?<text>[\S\s]*)/i)
}

const parseDamage = (damageText: string|undefined): Damage[] => {
    return damageText?.split(" plus ")
        .map(text => {
            const data = text.match(/\(*(?<amount>[\d]+)d(?<die>[\d]+)\s*[+|-]?\s*(?<bonus>[\d]*)\)*\s*(?<type>[\w]*)/i);
            if (data !== null) {
                return {
                    ...emptyDamage,
                    amount: Number(data.groups?.amount ?? 0),
                    die: Number(data.groups?.die ?? 0),
                    bonus: Number(data.groups?.bonus ?? 0),
                    type: getDamageTypeFrom(data.groups?.type ?? "error"),
                } as Damage
            } else {
                return emptyDamage;
            }
        }) ?? [emptyDamage];
}

const filterSpellCasting = (line: string) => {
    return line.match(/Spellcasting/i);
}