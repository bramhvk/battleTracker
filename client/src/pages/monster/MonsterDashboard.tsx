import GenericTable from "../../components/shared/5e/Table";
import React, {useEffect, useState} from "react";
import {Monster} from "../../types/monster/Monster";
import {getMonsters} from "../../services/MonsterService";

interface MonsterDashboardProps {
  onClick: (id: string) => void;
}

const MonsterDashboard: React.FC<MonsterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Monster[]>([])

    useEffect(() => {getMonsters().then(setData)}, [])

    const cols = [
        { key: "info.name", label: "Name" },
        { key: "info.ac", label: "AC" },
        { key: "info.hiyPoints", label: "Hit Points" },
        { key: "resistances", label: "Resistances" },
        { key: "immunities", label: "Immunities" },
        { key: "info.movement.speed", label: "Speed" },
        { key: "info.movement.swim", label: "Swim" },
        { key: "info.movement.fly", label: "Fly" },
        { key: "info.movement.burrow", label: "Burrow" },
    ];


    return (<GenericTable data={data} cols={cols} onClick={onClick} />);
}

export default MonsterDashboard;