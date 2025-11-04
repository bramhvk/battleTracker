import React, {useEffect, useState} from "react";
import {Encounter} from "../../types/encounters/Encounter";
import {getEncounters} from "../../services/EncounterService";
import {GridColDef} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TableComponent from "../../components/shared/Table";
import {PlayerCharacter} from "../../types/player/PlayerCharacter";
import {Monster} from "../../types/monster/Monster";
import {getPlayerCharacters} from "../../services/PlayerCharacterService";
import {getMonsters} from "../../services/MonsterService";

interface EncounterDashboardProps {
    onClick: (id: string) => void;
    onButtonClick: (id: string) => void;
}

const EncounterDashboard: React.FC<EncounterDashboardProps> = ({onClick, onButtonClick}) => {

    const [data, setData] = useState<Encounter[]>([]);
    const [players, setPlayers] = useState<PlayerCharacter[]>([]);
    const [monsters, setMonsters] = useState<Monster[]>([]);

    useEffect(() => {
        getEncounters().then(setData);
        getPlayerCharacters().then(setPlayers);
        getMonsters().then(setMonsters);
    }, []);


    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "name",
            flex: 2,
        },
        {
            field: "players",
            headerName: "Players",
            flex: 6,
            renderCell: (params) => {
                return params.row.players.map((p: string) => {
                    return players
                        .filter(pc => pc._id === p)
                        .map(pc => pc.name);
                }).join(", ");
            }
        },
        {
            field: "monsters",
            headerName: "Monsters",
            flex: 6,
            renderCell: (params) => {
                return params.row.monsters.map((p: string) => {
                    return monsters
                        .filter(m => m._id === p)
                        .map(m => m.name);
                }).join(", ");
            }
        },
        {
            field: "",
            headerName: "" ,
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button
                    variant={"contained"}
                    onClick={() => onButtonClick(params.row._id)}
                >
                    start
                </Button>
            )
        }
    ]

    return (
        <div>
            <TableComponent columns={columns} data={data} onRowClick={onClick} />
        </div>
    )

    // return (<GenericTable data={data} cols={cols} onClick={onClick} />);
}

export default EncounterDashboard;