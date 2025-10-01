import GenericTable from "../../shared/Table";
import React, {useEffect, useState} from "react";
import {emptyMonster, Monster} from "../../../types/Monster";
import Button from "@mui/material/Button";
import {getMonsters} from "../../../services/MonsterService";

interface MonsterDashboardProps {
  onClick: (monster: Monster) => void;
  onButtonClick: () => void;
}

const MonsterDashboard: React.FC<MonsterDashboardProps> = ({onClick, onButtonClick}) => {

    const [data, setData] = useState<Monster[]>([])
    const [noMonsterSelected, setNoMonsterSelected] = useState(true)

    useEffect(() => {getMonsters().then(setData)}, [])

    const cols = [
        { key: "name", label: "Name" },
        { key: "ac", label: "AC" },
        { key: "hitDice", label: "Hit Dice" },
        { key: "resistances", label: "Resistances" },
        { key: "immunities", label: "Immunities" },
        { key: "movement.speed", label: "Speed" },
        { key: "movement.swim", label: "Swim" },
        { key: "movement.fly", label: "Fly" },
        { key: "movement.burrow", label: "Burrow" },
    ];

    const handleTableRowClick = (id: string) => {
        onClick(data.find(data => data._id === id) as Monster);
        setNoMonsterSelected(false);
    }

    return (
        <>
            <GenericTable data={data} cols={cols} onClick={handleTableRowClick} />
            <Button onClick={() => {onClick(emptyMonster); onButtonClick();}}>Add Monster</Button>
            <Button onClick={onButtonClick} sx={{ display: noMonsterSelected ? "none" : "inline-flex" }}>Edit Monster</Button>
        </>
    );
}

export default MonsterDashboard;