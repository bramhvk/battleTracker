import React, {useEffect, useState} from "react";
import {getCampaigns} from "../../services/CampaignService";
import GenericTable from "../../components/shared/5e/Table";
import {Campaign} from "../../types/campaign/Campaign";


interface CampaignDashboardProps {
    onClick: (id: string) => void;
}

const CampaignDashboard: React.FC<CampaignDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Campaign[]>([])

    useEffect(() => {getCampaigns().then(setData)}, []);

    const cols = [
        { key: "name", label: "Name" },
    ];

    return (<GenericTable data={data} cols={cols} onClick={onClick} />);
}

export default CampaignDashboard;