import React, {useEffect, useState} from "react";
import {PlayerCharacter} from "../../types/player/PlayerCharacter";
import {getPlayerCharacters} from "../../services/PlayerCharacterService";
import TableComponent from "../../components/shared/Table";


interface PlayerCharacterDashboardProps {
    onClick: (id: string) => void;
}

const PlayerCharacterDashboard: React.FC<PlayerCharacterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<PlayerCharacter[]>([])

    useEffect(() => {getPlayerCharacters().then(setData)}, []);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1
        },
        {
            field: "ac",
            headerName: "AC",
            flex: 1
        },
        {
            field: "hitPoints",
            headerName: "Hit Points",
            flex: 1
        },
        {
            field: "maxHitPoints",
            headerName: "Max hit points",
            flex: 1
        },
    ];

    return (<TableComponent data={data} columns={columns} onRowClick={onClick} />);
}

export default PlayerCharacterDashboard;