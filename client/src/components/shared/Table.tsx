import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";

interface TableProps {
    data: any[]
    columns: GridColDef[],
    onRowClick: (id: string) => void;
}

const TableComponent: React.FC<TableProps> = ({data, columns, onRowClick}) => {
    return (
        <div>
            <DataGrid
                rows={data}
                columns={columns}
                onRowClick={(row) => onRowClick(row.row._id)}
                getRowId={row => row._id}
            />
        </div>
    );
}

export default TableComponent;