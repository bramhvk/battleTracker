import {TextExtractionComponent} from "../../shared/TextExtraction/TextExtractionComponent";
import {createMonsterFrom} from "../../../features/parsers/5e/MonsterParser";
import {useNavigate} from "react-router-dom";

interface ExtractMonsterProps {

}

const ExtractMonster: React.FC<ExtractMonsterProps> = () => {

    const navigate = useNavigate();

    const handleExtractedMonster = (imageData: string[]) => {
        navigate('/enemies/edit', {state: {monster: createMonsterFrom(imageData), imageData}})
    }

    return (
            <TextExtractionComponent onTextExtracted={handleExtractedMonster} />
    );
}

export default ExtractMonster;