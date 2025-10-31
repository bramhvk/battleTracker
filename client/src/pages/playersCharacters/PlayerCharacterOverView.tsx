import {isStringEmpty} from "../../utils/validation";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const PlayerCharacterOverview: React.FC = () => {

    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')

    return (
        <div>
            PLAYER CHARACTERS
            <Button onClick={() => navigate('/player-characters/create')}>create Player</Button>
            <Button onClick={() => navigate('/player-characters/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Player</Button>
        </div>
    )
}

export default PlayerCharacterOverview;