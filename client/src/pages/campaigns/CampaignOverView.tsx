import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {isStringEmpty} from "../../utils/validation";


const CampaignOverview: React.FC = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')

    return (
        <div>
            CAMPAIGNS
            <Button onClick={() => navigate('/campaigns/create')}>create Player</Button>
            <Button onClick={() => navigate('/campaigns/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Player</Button>
        </div>
    )
}

export default CampaignOverview;