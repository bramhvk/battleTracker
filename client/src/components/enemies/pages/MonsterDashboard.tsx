import GenericTable from "../../shared/Table";
import React, {useEffect, useState} from "react";
import {Monster} from "../../../types/Monster";

interface MonsterDashboardProps {
  onClick: (monster: Monster) => void;
}

const MonsterDashboard: React.FC<MonsterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Monster[]>([])

    useEffect(() => {
        fetch("/api/monsters/")
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
            })
    }, [])

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
        onClick(data.find(data => data._id === id) as Monster)
    }

    return (
        <GenericTable data={data} cols={cols} onClick={handleTableRowClick} />
    );
}

export default MonsterDashboard;