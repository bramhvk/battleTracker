import React, { useEffect, useRef, useState } from "react";

interface ContrastImageProps {
    imageData: string; // Base64 string or file URL
    initialContrast?: number; // default 150
    initialThreshold?: number; // default 128
    onDone: (processedImage: string[]) => void; // return updated image
}

const ContrastImageComponent: React.FC<ContrastImageProps> = ({
                                                         imageData,
                                                         initialContrast = 0,
                                                         initialThreshold = 128,
                                                         onDone,
                                                     }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [contrast, setContrast] = useState<number>(initialContrast);
    const [threshold, setThreshold] = useState<number>(initialThreshold);
    const [enableThreshold, setEnableThreshold] = useState<boolean>(false);

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

            const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageDataObj.data;

            // Adjust contrast
            const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            for (let i = 0; i < data.length; i += 4) {
                data[i] = factor * (data[i] - 128) + 128;       // red
                data[i + 1] = factor * (data[i + 1] - 128) + 128; // green
                data[i + 2] = factor * (data[i + 2] - 128) + 128; // blue

                if (enableThreshold) {
                    const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                    const color = brightness >= threshold ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = color;
                }
            }

            ctx.putImageData(imageDataObj, 0, 0);

            // Return updated image as Base64 string
            const processedImage = canvas.toDataURL("image/png");
            onDone([processedImage]);
        };
    }, [imageData, contrast, threshold, enableThreshold, onDone]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{ maxWidth: "100%", display: "block", marginBottom: "10px" }}
            />

            <div style={{ marginBottom: "10px" }}>
                <label>Contrast: {contrast}</label>
                <input
                    type="range"
                    min="-255"
                    max="255"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    style={{ width: "100%" }}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={enableThreshold}
                        onChange={() => setEnableThreshold(!enableThreshold)}
                        style={{ marginRight: "8px" }}
                    />
                    Enable Threshold
                </label>
            </div>

            {enableThreshold && (
                <div>
                    <label>Threshold: {threshold}</label>
                    <input
                        type="range"
                        min="0"
                        max="255"
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                        style={{ width: "100%" }}
                    />
                </div>
            )}
        </div>
    );
};

export default ContrastImageComponent;
