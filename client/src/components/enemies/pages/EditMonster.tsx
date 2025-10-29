import {emptyMonster, Monster} from "../../../types/Monster";
import React, {useEffect, useState} from "react";
import {getMonsterById} from "../../../services/MonsterService";
import {StatBlock} from "../../shared/StatBlock";
import {MonsterInfo} from "../../shared/MonsterInfo";
import {useLocation} from "react-router-dom";


const EditMonster: React.FC = () => {
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

    return (
        <>
            {id}
            {JSON.stringify(data)}
            <MonsterInfo data={data.info} />
            <StatBlock data={data.stats} />
        </>
    );
};

export default EditMonster;