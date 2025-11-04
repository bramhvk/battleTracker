import Button from "@mui/material/Button";
import {isStringEmpty} from "../../utils/validation";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import EncounterDashboard from "./EncounterDashboard";


const EncounterOverview: React.FC = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')


    return (
        <div>
            ENCOUNTERS
            <EncounterDashboard onClick={setSelectedId} onButtonClick={id => navigate(`/battle-tracker`, {state: {id}})}/>
            <Button onClick={() => navigate('/encounters/edit')}>create Player</Button>
            <Button onClick={() => navigate('/encounters/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Player</Button>
        </div>
    )
}

export default EncounterOverview;