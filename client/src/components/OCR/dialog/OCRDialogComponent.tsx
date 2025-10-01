import {OCR_DIALOG_TYPE} from "../utils/properties";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {CropImageComponent} from "../manipulation/CropImageComponent";
import Button from "@mui/material/Button";
import {useState} from "react";
import {SplitImageComponent} from "../manipulation/SplitImageComponent";
import ContrastImageComponent from "../manipulation/ContrastImageComponent";


interface OCRDialogProps {
    type: OCR_DIALOG_TYPE;
    open: boolean;
    imageData: string[];
    onClose: () => void;
    onConfirm: (imageData: string[]) => void;
}

const OCRDialogComponent: React.FC<OCRDialogProps> = ({type, open, imageData, onClose, onConfirm}) => {

    const [tempResult, setTempResult] = useState<string[] | null>(null);

    const handleConfirm = () => {
        if (tempResult !== null) {
            onConfirm(tempResult);
        }
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true}>
            <DialogTitle>{type}</DialogTitle>
            <DialogContent>
                {(() => {
                    switch (type) {
                        case OCR_DIALOG_TYPE.CROP:
                            return <CropImageComponent imageData={imageData[0]} onCrop={(res) => setTempResult(res)} />;
                        case OCR_DIALOG_TYPE.SPLIT:
                            return <SplitImageComponent imageData={imageData[0]} onSplit={(res) => setTempResult(res)} />;
                        case OCR_DIALOG_TYPE.CONTRAST:
                            return <ContrastImageComponent imageData={imageData[0]} onDone={(res) => setTempResult(res)}/>;
                        default:
                            return null;
                    }
                })()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color={"secondary"}>
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export {OCRDialogComponent};