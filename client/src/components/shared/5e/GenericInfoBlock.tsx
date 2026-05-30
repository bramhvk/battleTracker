import React from "react";
import {Movement} from "../../../types/shared/Movement";
import {Size} from "../../../types/shared/Size";
import {MovementBlock} from "./MovementBlock";
import {GenericInfo} from "../../../types/shared/GenericInfo";
import {NumberInput} from "../NumberInput";


interface GenericInfoProps {
    data: GenericInfo
    onChange: (update: GenericInfo) => void
}

const GenericInfoBlock: React.FC<GenericInfoProps> = ({data, onChange}) => {

    const handleChange = (key: keyof GenericInfo, value: number | string | Movement | Size) => {
        onChange({...data, [key]: value});
    }

    return (
        <div>
            <NumberInput label="ac" keyName="ac" data={data} onChange={onChange} />
            <NumberInput label="hit points" keyName="hitPoints" data={data} onChange={onChange} />
            <NumberInput label="hit dice" keyName="hitDice" data={data} onChange={onChange} />
            <NumberInput label="size" keyName="size" data={data} onChange={onChange} />
            <MovementBlock data={data.movement} onChange={updated => handleChange("movement", updated)} />
        </div>
    );
}

export {GenericInfoBlock};
