import {Monster} from "../../types/Monster";
import {useState} from "react";
import CreateMonsterDialog from "./dialog/CreateMonsterDialog";
import Button from "@mui/material/Button";

interface CreateEditMonsterProps {
    monster: Monster;
}

const CreateEditMonster: React.FC<CreateEditMonsterProps> = ({monster}) => {
    const [data, setData] = useState<Monster>(monster);
    const [createMonsterDialog, setCreateMonsterDialog] = useState(false)

    return (
        <>
            {data._id}
            <Button onClick={() => setCreateMonsterDialog(true)}>Scan Stat block</Button>
            <CreateMonsterDialog open={createMonsterDialog} onClose={() => setCreateMonsterDialog(false)} />
        </>
    );
};

export default CreateEditMonster;