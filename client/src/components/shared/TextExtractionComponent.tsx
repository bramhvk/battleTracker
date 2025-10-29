import React, {useState} from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {CircularProgress, styled} from "@mui/material";
import {createWorker, PSM} from "tesseract.js";
import {OCRDialogComponent} from "../OCR/dialog/OCRDialogComponent";
import {OCR_DIALOG_TYPE} from "../OCR/utils/properties";
import {isImageEmpty} from "../../utils/validation";

interface TextExtractionProps {
    onTextExtracted: (extractedText: string[]) => void;
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
    const [imageCount, setImageCount] = useState(0);
    const [imageTotal, setImageTotal] = useState(1)
    const [progressLabel, setProgressLabel] = useState('idle');
    const [ocrResult, setOcrResult] = useState(['']);

    const [cropDialogOpen, setCropDialogOpen] = useState<boolean>(false);
    const [splitDialogOpen, setSplitDialogOpen] = useState<boolean>(false);
    const [contrastDialogOpen, setContrastDialogOpen] = useState<boolean>(false);
    const [skewDialogOpen, setSkewDialogOpen] = useState<boolean>(false);

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

    const renderImages = () => {
        if (isImageEmpty(imageData)) return (<></>)

        return (
                imageData.map((image, index) => (
                    <img key={index} src={image} alt={`uploaded image ${index}`} style={{paddingRight: "10px"}}/>
                )))
    }

    const resizeImageForOCR = async (src: string, scale = 2): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext('2d')!;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png'));
            };
            img.src = src;
        });
    };

    const handleExtraction = async () => {
        setImageTotal(imageData.length);
        setImageCount(1);
        setProgress(0);
        setProgressLabel('starting');

        const worker = await createWorker('eng', 1, {
            logger: m => {
                if ('progress' in m) {
                    setProgress(m.progress * 100);
                    setProgressLabel(m.progress === 1 ? 'Done' : m.status);
                }
            },
    });

        await worker.setParameters({
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-+/().,\'–—%:;!? ',
            preserve_interword_spaces: '1',
            tessedit_pageseg_mode: PSM.SINGLE_COLUMN,
        });

        let data: string[] = [""];

        for (const img of imageData) {
            const resizedImg = await resizeImageForOCR(img, 2.5);
            const {
                data: {text},
            } = await worker.recognize(resizedImg);
            data.push(...text.split(/\r?\n|\r\n/g));
            setImageCount(imageCount + 1);
        }
        setOcrResult(data);
        onTextExtracted(data)
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

        {renderImages()}

        <Button onClick={() => setCropDialogOpen(true)}>Crop</Button>
        <Button onClick={resetImage}>reset image</Button>
        <Button onClick={() => setSplitDialogOpen(true)}>Split</Button>
        <Button onClick={() => setContrastDialogOpen(true)}>Contrast</Button>
        <Button onClick={() => setSkewDialogOpen(true)}>Skew</Button>
        <Button onClick={handleExtraction}>Extract</Button>

        <span>{progressLabel.toUpperCase()} {imageCount} / {imageTotal}</span>
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

        <OCRDialogComponent
            type={OCR_DIALOG_TYPE.SKEW}
            open={skewDialogOpen}
            imageData={imageData}
            onClose={() => setSkewDialogOpen(false)}
            onConfirm={(imageDate) => setImageData(imageDate)}
        />
    </>);
}

export {TextExtractionComponent};