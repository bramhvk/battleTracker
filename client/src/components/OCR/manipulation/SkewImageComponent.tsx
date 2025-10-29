import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ApplyImageChanges} from "../../shared/TextExtraction/TextExtractionComponent";

interface SkewImageProps {
    imageData: string; // Base64 string or file URL
    onDone: (processedImage: string[]) => void; // return updated image
}

const SkewImageComponent = forwardRef<ApplyImageChanges, SkewImageProps>(({imageData, onDone}, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [angle, setAngle] = useState(0); //in rads
    const [img, setImg] = useState<HTMLImageElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState<number | null>(null);

    // Load image
    useEffect(() => {
        const image = new Image();
        image.src = imageData;
        image.onload = () => setImg(image);
    }, [imageData]);


    const drawImage = () => {
        if (!canvasRef.current || !img) return;
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas to image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Translate to center for rotation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle); // rotate by current angle
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();

    };

    useEffect(() => {
        drawImage();
    }, [img, angle]);

    // Mouse handlers to drag and rotate
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || startX === null) return;
        const deltaX = e.clientX - startX;
        setAngle((prev) => prev + deltaX * 0.001); // change sensitivity if needed
        setStartX(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setStartX(null);
    };


    useImperativeHandle(ref, () => ({
        apply: () => {
            if (!canvasRef.current) return;
            const rotatedDataUrl = canvasRef.current.toDataURL("image/png");
            onDone([rotatedDataUrl]);
        }
    }));

    return (
        <canvas
            ref={canvasRef}
            style={{border: "1px solid black", cursor: "grab"}}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        />
    );
});

export default SkewImageComponent;
