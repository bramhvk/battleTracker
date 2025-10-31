import React, {useEffect, useState} from "react";
import {Encounter} from "../../types/encounters/Encounter";
import {getEncounters} from "../../services/EncounterService";
import GenericTable from "../../components/shared/5e/Table";

interface EncounterDashboardProps {
    onClick: (id: string) => void;
}

const EncounterDashboard: React.FC<EncounterDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Encounter[]>([])

    useEffect(() => {getEncounters().then(setData)}, []);

    const cols = [
        { key: "name", label: "Name" },
        { key: "ac", label: "AC" },
        { key: "hitPoints", label: "Hit Points" },
        { key: "maxHitPoints", label: "Max hit points" },
    ];

    return (<GenericTable data={data} cols={cols} onClick={onClick} />);
}

export default EncounterDashboard;