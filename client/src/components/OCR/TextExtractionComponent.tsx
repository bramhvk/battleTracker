import React, {useState} from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {CircularProgress, styled} from "@mui/material";
import {createWorker} from "tesseract.js";
import {OCRDialogComponent} from "./dialog/OCRDialogComponent";
import {OCR_DIALOG_TYPE} from "./utils/properties";

interface TextExtractionProps {
    onTextExtracted: (extractedText: string) => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const TextExtractionComponent: React.FC<TextExtractionProps> = ({onTextExtracted}) => {
    const [imageData, setImageData] = useState<string[]>(['']);
    const [originalImage, setOriginalImage] = useState<string[]>([''])
    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState('idle');
    const [ocrResult, setOcrResult] = useState('');

    const [cropDialogOpen, setCropDialogOpen] = useState<boolean>(false);
    const [splitDialogOpen, setSplitDialogOpen] = useState<boolean>(false);
    const [contrastDialogOpen, setContrastDialogOpen] = useState<boolean>(false);

    const loadFile = (file: File) => {
        console.log(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            const res = reader.result;
            setImageData([res as string]);
            setOriginalImage([res as string]);
        }
        reader.readAsDataURL(file);
    };


    const resetImage = () => {
        setImageData(originalImage);
    }

    const handleExtraction = async () => {
        setProgress(0);
        setProgressLabel('starting');

        const worker = await createWorker('eng', 1, {
            logger: m => {
                if ('progress' in m) {
                    setProgress(m.progress * 100);
                    setProgressLabel(m.progress === 1 ? 'Done' : m.status);
                }
            }
        });

        let fullText = "";

        for (const img of imageData) {
            const {
                data: { text },
            } = await worker.recognize(img);
            fullText += text + "\n"; // concatenate with newline
        }
        setOcrResult(fullText);
        console.log(fullText, fullText.split(/\r?\n|\r\n/g));
        onTextExtracted(fullText)
        await worker.terminate();
    };

    return (<>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon/>}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(event) => loadFile(event.target.files!.item(0)!)}
            />
        </Button>

        {Array.isArray(imageData) ? (
            imageData.map((image, index) => (
                <img key={index} src={image} alt={`uploaded image ${index}`} style={{paddingRight: "10px"}}/>
            ))
        ) : (
            <img src={imageData} alt="uploaded image" />
        )}

        <Button onClick={() => setCropDialogOpen(true)}>Crop</Button>
        <Button onClick={resetImage}>reset image</Button>
        <Button onClick={() => setSplitDialogOpen(true)}>Split</Button>
        <Button onClick={() => setContrastDialogOpen(true)}>Contrast</Button>
        <Button onClick={handleExtraction}>Extract</Button>

        <span>{progressLabel.toUpperCase()}</span>
        <CircularProgress variant={"determinate"} value={progress}/>

        <OCRDialogComponent
            type={OCR_DIALOG_TYPE.CROP}
            open={cropDialogOpen}
            imageData={imageData}
            onClose={() => setCropDialogOpen(false)}
            onConfirm={(imageDate) => setImageData(imageDate)}
        />

        <OCRDialogComponent
            type={OCR_DIALOG_TYPE.SPLIT}
            open={splitDialogOpen}
            imageData={imageData}
            onClose={() => setSplitDialogOpen(false)}
            onConfirm={(imageDate) => setImageData(imageDate)}
        />

        <OCRDialogComponent
            type={OCR_DIALOG_TYPE.CONTRAST}
            open={contrastDialogOpen}
            imageData={imageData}
            onClose={() => setContrastDialogOpen(false)}
            onConfirm={(imageDate) => setImageData(imageDate)}
        />
    </>);
}

export {TextExtractionComponent};