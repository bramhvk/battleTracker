import React, {useState} from "react";
import MonsterDashboard from "./MonsterDashboard";
import {useNavigate} from "react-router-dom";
import {isStringEmpty} from "../../utils/validation";
import Button from "@mui/material/Button";

const MonsterOverview: React.FC = () => {

    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')

    return (
        <div>
            <MonsterDashboard onClick={setSelectedId} />
            <Button onClick={() => navigate('/monsters/extract')}>Add Monster</Button>
            <Button onClick={() => navigate('/monsters/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Monster</Button>
        </div>
    );
}

export {MonsterOverview};