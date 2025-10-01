import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {StatBlock} from "../../shared/StatBlock";
import React from "react";
import {emptyStats} from "../../../types/Stats";

interface CreateEnemyDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateMonsterDialog: React.FC<CreateEnemyDialogProps> = ({open, onClose}) => {

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Add new Enemy</DialogTitle>
            <DialogContent>
                <StatBlock data={emptyStats} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color={"secondary"}>
                    Cancel
                </Button>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateMonsterDialog;