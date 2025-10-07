import {useEffect, useState} from "react";
import {TextExtractionComponent} from "./TextExtractionComponent";
import {FormControl, FormLabel, Input} from "@mui/material";
import {emptyStats, Stats} from "../../types/Stats";
import {isArrayEmpty} from "../../utils/validation";
import {createStatsFrom} from "../../features/parsers/5e/StatsParsers";

interface StatBlockProps {
    data: Stats;
    providedText?: string[];
}

const StatBlock: React.FC<StatBlockProps> = ({data, providedText}) => {

    const [stats, setStats] = useState(emptyStats)
    const [extractedText, setExtractedText] = useState<string[]>([""])

    const processStats = (extractedText: string[]) => {
        setExtractedText(extractedText)
        setStats(createStatsFrom(extractedText))
    }

    // set the data on page load
    useEffect(() => {
        console.log(data, providedText);
        setStats(data);
        providedText && !isArrayEmpty(providedText) && setExtractedText(providedText)
    }, [])

    return (
        <div>
            <FormControl>
                <FormLabel>STR</FormLabel>
                <Input placeholder="STR" value={stats.str} type={"number"} onChange={(e) => setStats({...stats, str: Number(e.target.value)})} />
            </FormControl>
            <FormControl>
                <FormLabel>DEX</FormLabel>
                <Input placeholder="DEX" value={stats.dex} type={"number"} onChange={(e) => setStats({...stats, dex: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>CON</FormLabel>
                <Input placeholder="CON" value={stats.con} type={"number"} onChange={(e) => setStats({...stats, con: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>INT</FormLabel>
                <Input placeholder="INT" value={stats.int} type={"number"} onChange={(e) => setStats({...stats, int: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>WIS</FormLabel>
                <Input placeholder="WIS" value={stats.wis} type={"number"} onChange={(e) => setStats({...stats, wis: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>CHA</FormLabel>
                <Input placeholder="CHA" value={stats.cha} type={"number"} onChange={(e) => setStats({...stats, cha: Number(e.target.value)})}/>
            </FormControl>
            <TextExtractionComponent onTextExtracted={(extractedText) => processStats(extractedText)}/>
        </div>
    );
}

export {StatBlock};