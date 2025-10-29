import {KeywordMap, ParserMatch} from "../ParserHelper";
import {emptyTrait, Trait} from "../../../types/Trait";
import {emptyTrigger, Trigger} from "../../../types/Trigger";
import {Attack, getRangeFrom} from "../../../types/Attack";
import {getDamageTypeFrom} from "../../../types/DamageType";

export const createTraitsFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = split(getTextFor(keywordMap, lines, parserMatches))
        .map(s => s.join(" "))
        .filter(s => s.length);

    const multiAttack = [...text].filter(parseMultiAttack);
    const attacks = [...text].map(parseAttack);

    const attackTraits = [...attacks].filter((a): a is RegExpMatchArray => a !== null).map((a)=> createAttackTrait(a));

    console.log(keywordMap.value ,text, multiAttack, attacks, attackTraits)

    return [
        ...attackTraits
    ];
}

const getTextFor = (keywordMap: KeywordMap, lines: string[], parserMatches: ParserMatch[]) => {
    const index = parserMatches.findIndex(p => p.keyword === keywordMap);

    if (index + 1 === parserMatches.length) {
        return lines.slice(parserMatches[index].index + 1)
    } else {
        return lines.slice(parserMatches[index].index + 1, parserMatches[index+1].index);
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
    return line.match(/^(?<name>[A-Z][\w\s'-]+)\.\s*(?<type>Melee|Ranged|Melee or Ranged)\s+[Weapon|Spell]+\s+Attack:\s*(?<bonus>[+–-]?\d+)\s*to hit[,.]{1,2}\s(Reach|Range)\s(?<reach>\d+|[\d\/\d]+)\s?ft[,.]{1,2}\s?(?<target>[\w\s,)(]*).\s*Hit:?\s*(?<damage>[\d\s\w]+|[\d\(\)d+\s\w-]+)\s+?damage.?\s*(?<text>[\S\s]*)/i)
}

const createAttackTrait = (match: RegExpMatchArray): Trait => {
    // @ts-ignore
    const damage = match[7].match(/(?<damage>[\d\(\)d+\s\w]+)\s(?<damageType>[\w]+)/i)

    if (damage === null) return emptyTrait;

    const trigger = parseTrigger(match[8]);


    return {
        ...emptyTrait,
        name: match[1],
        text: match[0],
        amount: 1,
        range: getRangeFrom(match[2]),
        bonus: Number(match[3]),
        reach: match[5],
        target: match[6],
        damageDice: damage[1],
        amountDice: damage[1],
        damageTypes: [getDamageTypeFrom(damage[2])],
        isMagical: false,
        triggers: [trigger]
    } as Attack;
}

const parseTrigger = (line: string): Trigger => {
    return emptyTrigger
}