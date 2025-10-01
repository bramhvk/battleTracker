import {Monster} from "../../../types/Monster";
import React, {useEffect, useState} from "react";
import CreateMonsterDialog from "../dialog/CreateMonsterDialog";
import Button from "@mui/material/Button";
import {getMonsterById} from "../../../services/MonsterService";
import {StatBlock} from "../../shared/StatBlock";
import {TextExtractionComponent} from "../../OCR/TextExtractionComponent";

interface CreateEditMonsterProps {
    id: string;
}

const CreateEditMonster: React.FC<CreateEditMonsterProps> = ({id}) => {
    const [data, setData] = useState<Monster | null>(null);
    const [createMonsterDialog, setCreateMonsterDialog] = useState(false)
    const [extractedText, setExtractedText] = useState('')

    useEffect(() => {
        getMonsterById(id).then(setData);
    }, [])

    //wait for data to be loaded before the first render
    if (!data) return null;

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <TextExtractionComponent onTextExtracted={setExtractedText}/>
            <StatBlock data={data.stats} providedText={extractedText}/>
            <Button onClick={() => setCreateMonsterDialog(true)}>Scan Stat block</Button>
            <CreateMonsterDialog open={createMonsterDialog} onClose={() => setCreateMonsterDialog(false)} />
        </>
    );
};

export default CreateEditMonster;