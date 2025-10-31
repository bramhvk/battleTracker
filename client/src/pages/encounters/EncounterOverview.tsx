import Button from "@mui/material/Button";
import {isStringEmpty} from "../../utils/validation";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const EncounterOverview: React.FC = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')

    return (
        <div>
            ENCOUNTERS
            <Button onClick={() => navigate('/encounters/create')}>create Player</Button>
            <Button onClick={() => navigate('/encounters/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Player</Button>
        </div>
    )
}

export default EncounterOverview;