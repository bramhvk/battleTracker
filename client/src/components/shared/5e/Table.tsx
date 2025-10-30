import * as React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Paper} from "@mui/material";

interface Column {
    key: string;   // supports nested keys like "movement.speed"
    label?: string;
}

interface Props {
    cols: Column[];
    data: any[];
    onClick?: (id: string) => void;
}

const DataGridTable: React.FC<Props> = ({ cols, data, onClick }) => {
    // Convert 'cols' into DataGrid column definitions
    // TODO: change behavior for arrays
    // TODO: parent/children table headers
    const columns: GridColDef[] = cols.map((col) => ({
        field: col.key,
        headerName: col.label || col.key,
        flex: 1,
        renderCell: (params) => {
            // supports nested access like "movement.speed"
            const value = col.key.split(".").reduce(
                (acc: any, k: string) => acc?.[k],
                params.row
            );
            return value ?? "-";
        },
    }));

    // DataGrid requires a unique `id` field
    const rows = data.map((row) => ({
        id: row._id ?? row.id ?? JSON.stringify(row), // fallback if no _id
        ...row,
    }));

    return (
        <Paper style={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                onRowClick={(params) => onClick?.(params.row._id ?? params.row.id)}
            />
        </Paper>
    );
};

export default DataGridTable;