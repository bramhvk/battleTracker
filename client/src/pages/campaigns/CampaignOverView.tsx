import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {isStringEmpty} from "../../utils/validation";
import CampaignDashboard from "./CampaignDashboard";


const CampaignOverview: React.FC = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('')

    return (
        <div>
            CAMPAIGNS
            <CampaignDashboard onClick={setSelectedId}/>
            <Button onClick={() => navigate('/campaigns/edit')}>create Campaign</Button>
            <Button onClick={() => navigate('/campaigns/edit', {state: {selectedId}})} sx={{ display: isStringEmpty(selectedId) ? "none" : "inline-flex" }}>Edit Campaign</Button>
        </div>
    )
}

export default CampaignOverview;