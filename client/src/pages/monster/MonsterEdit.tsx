import {emptyMonster, Monster} from "../../types/monster/Monster";
import React, {useEffect, useState} from "react";
import {createMonster, getMonsterById} from "../../services/MonsterService";
import {StatBlock} from "../../components/shared/5e/StatBlock";
import {MonsterInfo} from "../../components/shared/5e/MonsterInfo";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";


const MonsterEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id as string | undefined;
    const monster  = location.state?.monster as Monster | undefined;

    const [data, setData] = useState<Monster | null>(null);

    useEffect(() => {
            if (monster) {
                setData(monster);
            } else {
                if (id) {
                    getMonsterById(id).then(setData)
                } else {
                    setData(emptyMonster)
                }
            }
        }
    )



    //wait for data to be loaded before the first render
    if (!data) return null;

    const saveMonster = () => {
        createMonster(data).then((monster: Monster) => {
            console.log("saved! ",monster);
            navigate('/monsters/')
        })
    }

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <MonsterInfo data={data.info} />
            <StatBlock data={data.stats} />
            <Button onClick={saveMonster}>Save</Button>
        </>
    );
};

export default MonsterEdit;