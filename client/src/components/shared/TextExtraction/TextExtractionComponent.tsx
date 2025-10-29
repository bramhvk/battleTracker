import React, {useRef, useState} from "react";
import "./TextExtractionComponent.scss"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {CircularProgress, styled} from "@mui/material";
import {createWorker, PSM} from "tesseract.js";
import {OCR_TYPE} from "../../../types/OcrType";
import {isImageEmpty} from "../../../utils/validation";
import {CropImageComponent} from "../../OCR/manipulation/CropImageComponent";
import {SplitImageComponent} from "../../OCR/manipulation/SplitImageComponent";
import SkewImageComponent from "../../OCR/manipulation/SkewImageComponent";
import {flushSync} from "react-dom";

interface TextExtractionProps {
    onTextExtracted: (extractedText: string[]) => void;
}

export interface ApplyImageChanges {
    apply: () => void;
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
    const [ocrType, setOcrType] = useState<OCR_TYPE>(OCR_TYPE.NONE)
    const [ocrResult, setOcrResult] = useState(['']);

    const cropRef = useRef<ApplyImageChanges>(null);
    const splitRef = useRef<ApplyImageChanges>(null);
    const contrastRef = useRef<ApplyImageChanges>(null);
    const skewRef = useRef<ApplyImageChanges>(null);


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
        setOcrType(OCR_TYPE.NONE)
    }

    const applyChanges = () => {
        switch (ocrType) {
            case OCR_TYPE.CROP:
                cropRef.current?.apply();
                break;
            case OCR_TYPE.SPLIT:
                splitRef.current?.apply();
                break;
            case OCR_TYPE.CONTRAST:
                contrastRef.current?.apply();
                break;
            case OCR_TYPE.SKEW:
                skewRef.current?.apply();
                break;
            case OCR_TYPE.NONE:
                setOcrType(OCR_TYPE.NONE);
                break;
            default:
                return null;
        }
    }

    const handleImageData = (images: string[]) => {
        flushSync(() => {
            setImageData(images);
            setOcrType(OCR_TYPE.NONE);
        });
    }

    const renderImages = () => {
        if (isImageEmpty(imageData)) return (<></>)

        {
            return (() => {
                switch (ocrType) {
                    case OCR_TYPE.CROP:
                        return <CropImageComponent key="crop" imageData={imageData[0]} onCrop={handleImageData} ref={cropRef}/>;
                    case OCR_TYPE.SPLIT:
                        return <SplitImageComponent key="split" imageData={imageData[0]} onSplit={handleImageData} ref={splitRef}/>;
                    case OCR_TYPE.CONTRAST:
                        return <></>;
                        // return <ContrastImageComponent key="contrast" imageData={imageData[0]} onDone={handleImageData}/>;
                    case OCR_TYPE.SKEW:
                        return <SkewImageComponent key="skew" imageData={imageData[0]} onDone={handleImageData} ref={skewRef}/>;
                    case OCR_TYPE.NONE:
                        const key = "none" + imageData.length
                        return (
                            <div key={key}>
                                { imageData.map((image, index) => (<img key={index} src={image} alt={`uploaded image ${index}`} style={{padding:'0 5px'}}/>)) }
                            </div>
                        )
                    default:
                        return null;
                }
            })()
        }
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
        console.log(data)
        await worker.terminate();
    };

    return (
        <div>
            <div className="image-container">
                {renderImages()}
            </div>
            <div className="text-extraction">
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

                <Button onClick={applyChanges}>apply</Button>
                <Button onClick={resetImage}>reset image</Button>
                <Button onClick={() => setOcrType(OCR_TYPE.CROP)}>Crop</Button>
                <Button onClick={() => setOcrType(OCR_TYPE.SPLIT)}>Split</Button>
                {/*<Button onClick={() => setOcrType(OCR_TYPE.CONTRAST)}>Contrast</Button>*/}
                <Button onClick={() => setOcrType(OCR_TYPE.SKEW)}>Skew</Button>
                <Button onClick={handleExtraction}>Extract</Button>

                <span>{progressLabel.toUpperCase()} {imageCount} / {imageTotal}</span>
                <CircularProgress variant={"determinate"} value={progress}/>
            </div>
        </div>
    );
}

export {TextExtractionComponent};