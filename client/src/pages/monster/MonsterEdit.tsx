import {Monster} from "../../types/monster/Monster";
import React, {useEffect, useState} from "react";
import {createMonster, getMonsterById, updateMonster} from "../../services/MonsterService";
import {StatBlock} from "../../components/shared/5e/StatBlock";
import {GenericInfoBlock} from "../../components/shared/5e/GenericInfoBlock";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {isStringEmpty, isStringNotEmpty} from "../../utils/validation";
import {SensesBlock} from "../../components/shared/5e/Senses";
import {FormControl, FormLabel, Input} from "@mui/material";


const MonsterEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.selectedId as string;
    const monster = location.state?.monster as Monster;

    const [data, setData] = useState<Monster | null>(monster);

    useEffect(() => {
        if (isStringNotEmpty(id)) {
            getMonsterById(id).then(setData)
        }
    }, [id])


    //wait for data to be loaded before the first render
    if (!data) return null;

    const saveMonster = () => {
        isStringEmpty(data._id) ?
            createMonster(data).then(() => {
                console.log("created!", data);
                navigate('/monsters')
            }) :
            updateMonster(data).then(() => {
                console.log("saved! ", data);
                navigate('/monsters/')
            })
    }

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" value={data.name} type={"text"}
                       onChange={(e) => setData({...data, name: e.target.value})}/>
            </FormControl>
            <GenericInfoBlock data={data.info} onChange={updated => setData({...data, info: updated})}/>
            <StatBlock data={data.stats} onChange={updated => setData({...data, stats: updated})}/>
            <SensesBlock data={data.senses} onChange={updated => setData({...data, senses: updated})}/>
            <Button onClick={saveMonster}>Save</Button>
        </>
    );
};

export default MonsterEdit;