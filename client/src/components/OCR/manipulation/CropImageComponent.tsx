import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ApplyImageChanges} from "../../shared/TextExtraction/TextExtractionComponent";

interface CropImageProps {
    imageData: string;
    onCrop: (croppedImage: [string]) => void;
}

const CropImageComponent= forwardRef<ApplyImageChanges, CropImageProps>(({imageData, onCrop}, ref) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
    const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(
        null
    );

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
    }, [imageData]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        setIsDrawing(true);

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        setStartPoint({
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing || !startPoint || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rectBounds = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rectBounds.width;
        const scaleY = canvas.height / rectBounds.height;

        const x = (e.clientX - rectBounds.left) * scaleX;
        const y = (e.clientY - rectBounds.top) * scaleY;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = imageData;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const w = x - startPoint.x;
            const h = y - startPoint.y;
            setRect({x: startPoint.x, y: startPoint.y, w, h});

            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(startPoint.x, startPoint.y, w, h);
        };
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    useImperativeHandle(ref, () => ({
        apply: () => {
            if (!rect || !canvasRef.current) return;
            const {x, y, w, h} = rect;
            const tempCanvas = document.createElement("canvas");
            const ctx = tempCanvas.getContext("2d");
            if (!ctx) return;

            tempCanvas.width = Math.abs(w);
            tempCanvas.height = Math.abs(h);

            const img = new Image();
            img.src = imageData;
            img.onload = () => {
                ctx.drawImage(
                    img,
                    w < 0 ? x + w : x,
                    h < 0 ? y + h : y,
                    Math.abs(w),
                    Math.abs(h),
                    0,
                    0,
                    Math.abs(w),
                    Math.abs(h)
                );
                const croppedImage = tempCanvas.toDataURL("image/png");
                onCrop([croppedImage]);
            };
        }
    }));

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{border: "1px solid black", cursor: "crosshair"}}
            />
        </>
    );
});

export {CropImageComponent};