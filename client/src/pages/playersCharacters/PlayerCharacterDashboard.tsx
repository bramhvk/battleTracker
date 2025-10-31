import React, {useEffect, useState} from "react";
import {PlayerCharacter} from "../../types/player/PlayerCharacter";
import {getPlayerCharacters} from "../../services/PlayerCharacterService";
import GenericTable from "../../components/shared/5e/Table";


interface PlayerCharacterDashboardProps {
    onClick: (id: string) => void;
}

const PlayerCharacterDashboard: React.FC<PlayerCharacterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<PlayerCharacter[]>([])

    useEffect(() => {getPlayerCharacters().then(setData)}, []);

    const cols = [
        { key: "name", label: "Name" },
        { key: "ac", label: "AC" },
        { key: "hitPoints", label: "Hit Points" },
        { key: "maxHitPoints", label: "Max hit points" },
    ];

    return (<GenericTable data={data} cols={cols} onClick={onClick} />);
}

export default PlayerCharacterDashboard;