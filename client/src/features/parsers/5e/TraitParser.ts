import {KeywordMap, ParserMatch} from "../ParserHelper";
import {emptyTrait, Trait} from "../../../types/Trait";
import {emptyTrigger, Trigger} from "../../../types/Trigger";
import {Attack, AttackRange, getRangeFrom} from "../../../types/Attack";
import {getDamageTypeFrom} from "../../../types/DamageType";
import {Damage, emptyDamage} from "../../../types/Damage";

export const createTraitsFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = split(getTextFor(keywordMap, lines, parserMatches))
        .map(s => s.join(" "))
        .filter(s => s.length);

    const multiAttack = [...text].filter(parseMultiAttack);
    const attacks = [...text].map(parseAttack);

    const attackTraits = [...attacks].filter((a): a is RegExpMatchArray => a !== null).map((a) => createAttackTrait(a));

    console.log(keywordMap.value, text, multiAttack, attacks, attackTraits)

    return [
        ...attackTraits
    ];
}

const getTextFor = (keywordMap: KeywordMap, lines: string[], parserMatches: ParserMatch[]) => {
    const index = parserMatches.findIndex(p => p.keyword === keywordMap);

    if (index + 1 === parserMatches.length) {
        return lines.slice(parserMatches[index].index + 1)
    } else {
        return lines.slice(parserMatches[index].index + 1, parserMatches[index + 1].index);
    }
}

const split = (lines: string[]): string[][] => {
    return lines.reduce<string[][]>((acc, line) => {
        if (line.trim() === "") acc.push([]);
        else (acc[acc.length - 1] || acc[acc.push([]) - 1]).push(line);
        return acc;
    }, [])
}

const parseMultiAttack = (line: string) => {
    return line.match(/MultiAttack./i);
}

const parseAttack = (line: string) => {
    // @ts-ignore
    return line.match(/^(?<name>[A-Z][\w\s'-\(\)]+)\.\s*(?<type>Melee|Ranged|Melee or Ranged)\s+(?<isMagic>Weapon|Spell)+\s+Attack:\s*(?<bonus>[+–-]?\d+)\s*to hit[,.]{1,2}\s(?<reach>Reach)?\s?(?<reachDist>\d+|[\d\/]+)?\s?(?:ft[,.]{1,2})?\s?(?:or)?\s?(?<range>Range)?\s?(?<rangeDist>[\d\/]*)?\s*(?:ft[,.]{1,2})?\s*(?<target>[\w\s,)(]*?)\.\s*Hit:?\s*(?<damage>[\d\s\w()+\-]+)\s*damage\.?\s*(?<text>[\S\s]*)/i)
}

const createAttackTrait = (match: RegExpMatchArray): Trait => {
    const trigger = parseTrigger(match[8]);

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
        triggers: [trigger]
    } as Attack;
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

const parseTrigger = (line: string): Trigger => {
    return emptyTrigger
}