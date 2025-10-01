import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {StatBlockExtractor} from "../../shared/StatBlockExtractor";
import React from "react";

interface CreateEnemyDialogProps {
    open: boolean;
    onClose: () => void;
    // onConfirm: (imageData: string[]) => void;
}

const CreateMonsterDialog: React.FC<CreateEnemyDialogProps> = ({open, onClose}) => {

    // const handleConfirm = () => {
    //     if (tempResult !== null) {
    //         onConfirm(tempResult);
    //     }
    //     onClose();
    // }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Add new Enemy</DialogTitle>
            <DialogContent>
                <StatBlockExtractor />
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