import GenericTable from "../../shared/Table";
import React, {useEffect, useState} from "react";
import {Monster} from "../../../types/Monster";
import {getMonsters} from "../../../services/MonsterService";

interface MonsterDashboardProps {
  onClick: (id: string) => void;
}

const MonsterDashboard: React.FC<MonsterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Monster[]>([])

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


    return (<GenericTable data={data} cols={cols} onClick={onClick} />);
}

export default MonsterDashboard;