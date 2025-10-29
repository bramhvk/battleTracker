import {TextExtractionComponent} from "../../shared/TextExtractionComponent";
import {useState} from "react";

interface ExtractMonsterProps {

}

const ExtractMonster: React.FC<ExtractMonsterProps> = () => {

    const [extractedText, setExtractedText] = useState<string[]>([]);

    return (
        <div>
            <TextExtractionComponent onTextExtracted={setExtractedText} />
        </div>
    );
}

export default ExtractMonster;