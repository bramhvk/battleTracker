import {emptyMonster, emptyMonsterObject, Monster} from "../../../types/Monster";
import React, {useEffect, useState} from "react";
import CreateMonsterDialog from "../dialog/CreateMonsterDialog";
import Button from "@mui/material/Button";
import {getMonsterById} from "../../../services/MonsterService";
import {StatBlock} from "../../shared/StatBlock";
import {TextExtractionComponent} from "../../shared/TextExtractionComponent";
import {MonsterInfo} from "../../shared/MonsterInfo";
import {createMonsterFrom} from "../../../features/parsers/5e/MonsterParser";

interface CreateEditMonsterProps {
    id?: string;
}

const CreateEditMonster: React.FC<CreateEditMonsterProps> = ({id}) => {
    const [data, setData] = useState<Monster | null>(null);
    const [createMonsterDialog, setCreateMonsterDialog] = useState(false)
    const [extractedText, setExtractedText] = useState([''])

    useEffect(() => { id ? getMonsterById(id).then(setData) : setData(emptyMonster);}, [id])

    const handleExtractedText = (extractedText: string[]) => {
        setData(emptyMonsterObject);
        setData(createMonsterFrom(extractedText))
    }

    //wait for data to be loaded before the first render
    if (!data) return null;

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <TextExtractionComponent onTextExtracted={handleExtractedText}/>
            <MonsterInfo data={data.info} />
            <StatBlock data={data.stats} />
            {/*<StatBlock data={data.savingThrows} />*/}
            <Button onClick={() => setCreateMonsterDialog(true)}>Scan Stat block</Button>
            <CreateMonsterDialog open={createMonsterDialog} onClose={() => setCreateMonsterDialog(false)} />
        </>
    );
};

export default CreateEditMonster;