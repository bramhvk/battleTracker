import React, {useState} from "react";
import MonsterDashboard from "./pages/MonsterDashboard";
import CreateEditMonster from "./pages/CreateEditMonster";

enum ComponentState {
    OVERVIEW,
    EDIT,
}

interface EnemyDashboardProps {

}

const MonsterOverview: React.FunctionComponent<EnemyDashboardProps> = () => {

    const [state, setState] = useState(ComponentState.OVERVIEW)
    const [selectedMonsterId, setSelectedMonsterId] = useState('')

    return (
        <div>
            {(() => {
                switch (state) {
                    case ComponentState.OVERVIEW:
                        return <MonsterDashboard onClick={setSelectedMonsterId} onButtonClick={() => setState(ComponentState.EDIT)} />;
                    case ComponentState.EDIT:
                        return <CreateEditMonster id={selectedMonsterId}/>
                    default:
                        return null;
                }
            })()}
        </div>
    );
}

export {MonsterOverview};