import React, {useEffect, useState} from "react";
import {Monster} from "../../types/monster/Monster";
import {getMonsters} from "../../services/MonsterService";
import TableComponent from "../../components/shared/Table";
import {GridColDef} from "@mui/x-data-grid";

interface MonsterDashboardProps {
  onClick: (id: string) => void;
}

const MonsterDashboard: React.FC<MonsterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Monster[]>([])

    useEffect(() => {getMonsters().then(setData)}, [])

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "info.ac",
            headerName: "AC",
            flex: 1,
            renderCell: (params) => {
                return (params.row.info.ac);
            }
        },
        {
            field: "info.hitPoints",
            headerName: "Hit Points",
            flex: 1,
            renderCell: (params) => {
                return (params.row.info.hitPoints);
            }
        },
        {
            field: "resistances",
            headerName: "Resistances",
            flex: 2,
            renderCell: (params) => {
                return params.row.resistances.join(" ")
            }
        },
        {
            field: "immunities",
            headerName: "Immunities",
            flex: 2,
            renderCell: (params) => {
                return params.row.immunities.join(" ")
            }
        },
        {
            field: "info.movement.speed",
            headerName: "Speed",
            flex: 1,
            renderCell: (params) => {
                return (params.row.info.movement.speed);
            }
        },
        {
            field: "info.movement.swim",
            headerName: "Swim",
            flex: 1,
            renderCell: (params) => {
                return (params.row.info.movement.swim);
            }
        },
        {
            field: "info.movement.fly",
            headerName: "Fly",
            flex: 1,
            renderCell: (params) => {
                return (params.row.info.movement.fly);
            }
        },
        {
            field: "info.movement.burrow",
            headerName: "Burrow",
            flex: 1,
            renderCell: (params) => {
                return (params.row.info.movement.burrow);
            }
        },
    ];


    return (<TableComponent data={data} columns={columns} onRowClick={onClick} />);
}

export default MonsterDashboard;