import React, {useState} from "react";
import Button from "@mui/material/Button";
import MonsterDashboard from "./pages/MonsterDashboard";
import CreateEditMonster from "./CreateEditMonster";
import {emptyMonster, isEmpty} from "../../types/Monster";

enum ComponentState {
    OVERVIEW,
    EDIT,
}

interface EnemyDashboardProps {

}

const MonsterOverview: React.FunctionComponent<EnemyDashboardProps> = () => {

    const [state, setState] = useState(ComponentState.OVERVIEW)
    const [selectedMonster, setSelectedMonster] = useState(emptyMonster)

    return (
        <div>
            {(() => {
                switch (state) {
                    case ComponentState.OVERVIEW:
                        return <MonsterDashboard onClick={setSelectedMonster} />;
                    case ComponentState.EDIT:
                        return <CreateEditMonster monster={selectedMonster}/>
                    default:
                        return null;
                }
            })()}
            <Button onClick={() => {setState(ComponentState.EDIT); setSelectedMonster(emptyMonster)}}>Add Monster</Button>
            <Button onClick={() => setState(ComponentState.EDIT)} sx={{ display: isEmpty(selectedMonster) ? "none" : "inline-flex" }}>Edit Monster</Button>
        </div>
    );
}

export {MonsterOverview};