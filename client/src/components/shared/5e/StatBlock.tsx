import {statKeys, Stats} from "../../../types/shared/Stats";
import {NumberInput} from "../NumberInput";

interface StatBlockProps {
    data: Stats;
    providedText?: string[];
    onChange: (update: Stats) => void
}

const StatBlock: React.FC<StatBlockProps> = ({data, onChange}) => {

    return (
        <div>
            {statKeys.map((keyName) => (
                <NumberInput label={keyName} keyName={keyName} data={data} onChange={onChange} />
            ))}
        </div>
    );
}

export {StatBlock};