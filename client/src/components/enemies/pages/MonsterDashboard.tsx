import GenericTable from "../../shared/Table";
import React, {useEffect, useState} from "react";
import {Monster} from "../../../types/Monster";
import Button from "@mui/material/Button";
import {getMonsters} from "../../../services/MonsterService";

interface MonsterDashboardProps {
  onClick: (id: string) => void;
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
        onClick(id);
        setNoMonsterSelected(false);
    }

    return (
        <>
            <GenericTable data={data} cols={cols} onClick={handleTableRowClick} />
            <Button onClick={() => {onClick(''); onButtonClick();}}>Add Monster</Button>
            <Button onClick={onButtonClick} sx={{ display: noMonsterSelected ? "none" : "inline-flex" }}>Edit Monster</Button>
        </>
    );
}

export default MonsterDashboard;