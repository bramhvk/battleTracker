import {isStringEmpty} from "../../utils/validation";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import PlayerCharacterDashboard from "./PlayerCharacterDashboard";

const PlayerCharacterOverview: React.FC = () => {

    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')

    return (
        <div>
            PLAYER CHARACTERS
            <PlayerCharacterDashboard onClick={setSelectedId} />
            <Button onClick={() => navigate('/player-characters/edit')}>create Player</Button>
            <Button onClick={() => navigate('/player-characters/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Player</Button>
        </div>
    )
}

export default PlayerCharacterOverview;