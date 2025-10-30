import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ApplyImageChanges} from "../../shared/5e/TextExtraction/TextExtractionComponent";

interface SplitImageProps {
    imageData: string;
    onSplit: (splitImages: string[]) => void;
}

const SplitImageComponent = forwardRef<ApplyImageChanges, SplitImageProps>(({imageData, onSplit}, ref) => {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const [splitX, setSplitX] = useState<number | null>(null);
        const [hasSplit, setHasSplit] = useState(false);

        useEffect(() => {
            if (!canvasRef.current || !imageData) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = new Image();
            img.src = imageData;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
        }, [imageData, hasSplit]);

        useEffect(() => {
            setHasSplit(false);
        }, [imageData]);

        const handleClick = (e: React.MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;

            // Adjust click position to actual canvas coordinate space
            const x = (e.clientX - rect.left) * scaleX;

            setSplitX(x);

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = new Image();
            img.src = imageData;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                // Draw vertical line at the scaled X position
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            };
        };

        useImperativeHandle(ref, () => ({
                apply: () => {
                    if (splitX === null) return;

                    const x = splitX;
                    const img = new Image();
                    img.src = imageData;

                    img.onload = () => {
                        const leftCanvas = document.createElement("canvas");
                        const rightCanvas = document.createElement("canvas");

                        // Left part
                        leftCanvas.width = splitX;
                        leftCanvas.height = img.height;
                        const leftCtx = leftCanvas.getContext("2d");
                        leftCtx?.drawImage(img, 0, 0, splitX, img.height, 0, 0, splitX, img.height);

                        // Right part
                        const rightWidth = img.width - splitX;
                        rightCanvas.width = rightWidth;
                        rightCanvas.height = img.height;
                        const rightCtx = rightCanvas.getContext("2d");
                        rightCtx?.drawImage(img, splitX, 0, rightWidth, img.height, 0, 0, rightWidth, img.height);

                        const leftImage = leftCanvas.toDataURL("image/png");
                        const rightImage = rightCanvas.toDataURL("image/png");

                        onSplit([leftImage, rightImage]);
                        setHasSplit(true);
                    };
                }

            }
        ));

        return (
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                style={{border: "1px solid black", cursor: "crosshair"}}
            />
        );
    })
;

export {SplitImageComponent};
