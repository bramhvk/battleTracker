import {emptyMonster, Monster} from "../../types/monster/Monster";
import React, {useEffect, useState} from "react";
import {getMonsterById, updateMonster} from "../../services/MonsterService";
import {StatBlock} from "../../components/shared/5e/StatBlock";
import {GenericInfoBlock} from "../../components/shared/5e/GenericInfoBlock";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {isStringNotEmpty} from "../../utils/validation";


const MonsterEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.selectedId as string;

    const [data, setData] = useState<Monster | null>(null);

    useEffect(() => {
        if (isStringNotEmpty(id)) {
            getMonsterById(id).then(setData)
        } else {
            setData(emptyMonster)
        }
    }, [id])


    //wait for data to be loaded before the first render
    if (!data) return null;

    const saveMonster = () => {
        updateMonster(data).then(() => {
            console.log("saved! ", data);
            navigate('/monsters/')
        })
    }

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <GenericInfoBlock data={data.info} onChange={updated => setData({...data, info: updated})}/>
            <StatBlock data={data.stats} onChange={updated => setData({...data, stats: updated})}/>
            <Button onClick={saveMonster}>Save</Button>
        </>
    );
};

export default MonsterEdit;