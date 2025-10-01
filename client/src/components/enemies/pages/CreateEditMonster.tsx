import {emptyMonster, Monster} from "../../../types/Monster";
import {useEffect, useState} from "react";
import CreateMonsterDialog from "../dialog/CreateMonsterDialog";
import Button from "@mui/material/Button";
import {getMonsterById} from "../../../services/MonsterService";

interface CreateEditMonsterProps {
    id: string;
}

const CreateEditMonster: React.FC<CreateEditMonsterProps> = ({id}) => {
    const [data, setData] = useState<Monster>(emptyMonster);
    const [createMonsterDialog, setCreateMonsterDialog] = useState(false)

    useEffect(() => {getMonsterById(id).then(setData)}, [])

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <Button onClick={() => setCreateMonsterDialog(true)}>Scan Stat block</Button>
            <CreateMonsterDialog open={createMonsterDialog} onClose={() => setCreateMonsterDialog(false)} />
        </>
    );
};

export default CreateEditMonster;