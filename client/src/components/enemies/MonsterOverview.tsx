import React, {useState} from "react";
import MonsterDashboard from "./pages/MonsterDashboard";
import CreateEditMonster from "./CreateEditMonster";
import {emptyMonster} from "../../types/Monster";

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
                        return <MonsterDashboard onClick={setSelectedMonster} onButtonClick={() => setState(ComponentState.EDIT)} />;
                    case ComponentState.EDIT:
                        return <CreateEditMonster monster={selectedMonster}/>
                    default:
                        return null;
                }
            })()}
        </div>
    );
}

export {MonsterOverview};