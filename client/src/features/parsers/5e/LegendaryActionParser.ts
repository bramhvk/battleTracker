import {KeywordMap, ParserMatch} from "../ParserHelper";
import {Trait} from "../../../types/shared/Trait";
import {determineTextFor} from "./TraitParser";
import {LegendaryAction} from "../../../types/monster/LegendaryAction";


export const createLegendaryActionsFrom = (lines: string[], keywordMap: KeywordMap, parserMatches: ParserMatch[]): Trait[] => {
    const text = determineTextFor(lines, keywordMap, parserMatches);
    if (text.length <= 0) return [];

    const mainTrait = {
        name: "Legendary Actions",
        text: text[0],
        amount: text[0].match(/(?:[\w\s]+)(?<amount>\d)\s*(?:legendary actions)[\w\W\s]*i/)?.groups?.amount,
    } as Trait

    const lActions = [...text].slice(1)
        .map(s => s.match(/(?<name>[\w]+)[\s\w\(]*(?<cost>\d+)[\s\w\)]*\.(?<text>[\w\W\s]*)/i))
        .map(res => {
            return {
                name: res?.groups?.name,
                text: res?.groups?.text,
                cost: res?.groups?.cost ?? 0,
            } as LegendaryAction
        })

    return [
        mainTrait,
        ...lActions
    ];
}