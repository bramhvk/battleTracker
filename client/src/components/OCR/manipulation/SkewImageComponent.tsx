import React, {useEffect, useRef, useState} from "react";

interface SkewImageProps {
    imageData: string; // Base64 string or file URL
    onDone: (processedImage: string[]) => void; // return updated image
}

const SkewImageComponent: React.FC<SkewImageProps> = ({ imageData, onDone }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [angle, setAngle] = useState(0);
    const [zoom, setZoom] = useState(1); // 1 = 100%
    const [showGuide, setShowGuide] = useState(false);
    const [img, setImg] = useState<HTMLImageElement | null>(null);

    // Load image
    useEffect(() => {
        const image = new Image();
        image.src = imageData;
        image.onload = () => setImg(image);
    }, [imageData]);

    // Draw image on canvas with rotation + zoom
    const drawImage = () => {
        if (!canvasRef.current || !img) return;
        const ctx = canvasRef.current.getContext("2d")!;
        const cw = canvasRef.current.width = canvasRef.current.clientWidth;
        const ch = canvasRef.current.height = canvasRef.current.clientHeight;

        ctx.clearRect(0, 0, cw, ch);
        ctx.save();
        ctx.translate(cw / 2, ch / 2);
        ctx.scale(zoom, zoom); // zoom applied here
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();

        // Draw horizontal guideline
        if (showGuide) {
            ctx.save();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, ch / 2);
            ctx.lineTo(cw, ch / 2);
            ctx.stroke();
            ctx.restore();
        }
    };

    useEffect(() => {
        drawImage();
    }, [img, angle, zoom, showGuide]);

    // Handle Done
    const handleDone = () => {
        if (!canvasRef.current) return;
        const dataURL = canvasRef.current.toDataURL("image/png");
        onDone([dataURL]);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <canvas
                ref={canvasRef}
                style={{
                    border: "1px solid #ccc",
                    width: "100%",   // fill dialog width
                    height: "400px", // fixed height or adjust to your dialog
                }}
            />

            <label>
                Rotate: {angle.toFixed(1)}°
                <input
                    type="range"
                    min={-20}
                    max={20}
                    step={0.1}
                    value={angle}
                    onChange={(e) => setAngle(parseFloat(e.target.value))}
                    style={{width: "100%"}}
                />
            </label>

            <label>
                Zoom: {(zoom * 100).toFixed(0)}%
                <input
                    type="range"
                    min={0.1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    style={{width: "100%"}}
                />
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={showGuide}
                    onChange={() => setShowGuide(!showGuide)}
                />
                Show Horizontal Guideline
            </label>

            <button onClick={handleDone}>Done</button>
        </div>
    );
};

export default SkewImageComponent;
