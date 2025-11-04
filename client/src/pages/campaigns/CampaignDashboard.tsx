import React, {useEffect, useState} from "react";
import {getCampaigns} from "../../services/CampaignService";
import {Campaign} from "../../types/campaign/Campaign";
import TableComponent from "../../components/shared/Table";
import {GridColDef} from "@mui/x-data-grid";


interface CampaignDashboardProps {
    onClick: (id: string) => void;
}

const CampaignDashboard: React.FC<CampaignDashboardProps> = ({onClick}) => {

    const [data, setData] = useState<Campaign[]>([])

    useEffect(() => {getCampaigns().then(setData)}, []);

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
    ];

    return (<TableComponent data={data} columns={columns} onRowClick={onClick} />);
}

export default CampaignDashboard;