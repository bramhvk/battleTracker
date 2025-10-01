import {useState} from "react";
import {parseStats} from "../../utils/OCR/TextParserDnd5e";
import {TextExtractionComponent} from "../OCR/TextExtractionComponent";
import {FormControl, FormLabel, Input} from "@mui/material";
import {emptyStats} from "../../types/Stats";

interface StatBlockExtractorProps {
}

const StatBlockExtractor: React.FC<StatBlockExtractorProps> = ({}) => {

    const [stats, setStats] = useState(emptyStats)
    const [extractedText, setExtractedText] = useState('')

    const placeStats = (extractedText: string) => {
        setExtractedText(extractedText)
        setStats(parseStats(extractedText))
    }

    return (
        <div>
            <FormControl>
                <FormLabel>STR</FormLabel>
                <Input placeholder="STR" value={stats.str} type={"number"}/>
            </FormControl>
            <FormControl>
                <FormLabel>DEX</FormLabel>
                <Input placeholder="DEX" value={stats.dex} type={"number"}/>
            </FormControl>
            <FormControl>
                <FormLabel>CON</FormLabel>
                <Input placeholder="CON" value={stats.con} type={"number"}/>
            </FormControl>
            <FormControl>
                <FormLabel>INT</FormLabel>
                <Input placeholder="INT" value={stats.int} type={"number"}/>
            </FormControl>
            <FormControl>
                <FormLabel>WIS</FormLabel>
                <Input placeholder="WIS" value={stats.wis} type={"number"}/>
            </FormControl>
            <FormControl>
                <FormLabel>CHA</FormLabel>
                <Input placeholder="CHA" value={stats.cha} type={"number"}/>
            </FormControl>
            <TextExtractionComponent onTextExtracted={(extractedText) => placeStats(extractedText)}/>
        </div>
    );
}

export {StatBlockExtractor};