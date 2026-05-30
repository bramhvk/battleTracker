import {Senses, sensesKeys} from "../../../types/shared/Senses";
import {NumberInput} from "../NumberInput";

interface SensesProps {
    data: Senses;
    onChange: (updated: Senses) => void;
}

const SensesBlock: React.FC<SensesProps> = ({data, onChange}) => {

    return (
        <>
            {sensesKeys.map((keyName) => (
                <NumberInput label={keyName} keyName={keyName} data={data} onChange={onChange} />
            ))}
        </>
    )
}

export {SensesBlock};