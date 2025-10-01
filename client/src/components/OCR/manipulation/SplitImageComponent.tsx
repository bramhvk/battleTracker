import { useEffect, useRef, useState } from "react";

interface SplitImageProps {
    imageData: string;
    onSplit: (splitImages: string[]) => void;
}

const SplitImageComponent: React.FC<SplitImageProps> = ({ imageData, onSplit }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [splitX, setSplitX] = useState<number | null>(null);

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

    const handleClick = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect || !canvasRef.current) return;

        const x = e.clientX - rect.left;
        setSplitX(x);

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = imageData;
        img.onload = () => {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            ctx.drawImage(img, 0, 0);

            // Draw vertical line
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasRef.current!.height);
            ctx.stroke();

            // Slice image immediately and pass to parent
            const leftCanvas = document.createElement("canvas");
            const rightCanvas = document.createElement("canvas");

            leftCanvas.width = x;
            leftCanvas.height = img.height;
            leftCanvas.getContext("2d")?.drawImage(img, 0, 0, x, img.height, 0, 0, x, img.height);

            const rightWidth = img.width - x;
            rightCanvas.width = rightWidth;
            rightCanvas.height = img.height;
            rightCanvas.getContext("2d")?.drawImage(img, x, 0, rightWidth, img.height, 0, 0, rightWidth, img.height);

            const leftImage = leftCanvas.toDataURL("image/png");
            const rightImage = rightCanvas.toDataURL("image/png");

            onSplit([leftImage, rightImage]);
        };
    };

    return (
        <canvas
            ref={canvasRef}
            onClick={handleClick}
            style={{ border: "1px solid black", cursor: "crosshair" }}
        />
    );
};

export { SplitImageComponent };
