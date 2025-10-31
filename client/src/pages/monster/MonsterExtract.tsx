import {TextExtractionComponent} from "../../components/shared/5e/TextExtraction/TextExtractionComponent";
import {createMonsterFrom} from "../../features/parsers/5e/MonsterParser";
import {useNavigate} from "react-router-dom";

interface ExtractMonsterProps {

}

const MonsterExtract: React.FC<ExtractMonsterProps> = () => {

    const navigate = useNavigate();

    const handleExtractedMonster = (imageData: string[]) => {
        navigate('/monsters/edit', {state: {monster: createMonsterFrom(imageData), imageData}})
    }

    return (
            <TextExtractionComponent onTextExtracted={handleExtractedMonster} />
    );
}

export default MonsterExtract;