import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {InitiativeEntry} from "../type/InitiativeEntry";

interface InitiativeDialogProps {
    entities: InitiativeEntry[];
    open: boolean;
}

export const InitiativeDialog: React.FC<InitiativeDialogProps> = ({open, entities}) => {

    return (
        <Dialog open={open}>
            <DialogTitle>Initiative</DialogTitle>
            <DialogContent>
                {(entities.map(e => (
                    <div>
                        <p>{e.entity.name}</p>
                    </div>
                )))}
            </DialogContent>
        </Dialog>
    );
}

export default InitiativeDialog;