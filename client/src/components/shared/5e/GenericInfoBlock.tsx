import {FormControl, FormLabel, Input} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Movement} from "../../../types/shared/Movement";
import {Size} from "../../../types/shared/Size";
import {MovementBlock} from "./MovementBlock";
import {emptyGenericInfo, GenericInfo} from "../../../types/shared/GenericInfo";


interface GenericInfoProps {
    data: GenericInfo
    providedText?: string;
    onChange: (update: GenericInfo) => void
}

const GenericInfoBlock: React.FC<GenericInfoProps> = ({data, providedText, onChange}) => {

    const [genericMonsterInfo, setGenericInfo] = useState(emptyGenericInfo);

    useEffect(() => { setGenericInfo(data); }, [data]);

    const handleChange = (key: keyof GenericInfo, value: number | string | Movement | Size) => {
        onChange({...data, [key]: value});
    }

    return (
        <div>
            <FormControl>
                <FormLabel>AC</FormLabel>
                <Input placeholder="AC" value={genericMonsterInfo.ac} type={"number"} onChange={(e) => handleChange("ac", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hit Points</FormLabel>
                <Input placeholder="Hit Points" value={genericMonsterInfo.hitPoints} type={"number"} onChange={(e) => handleChange("hitPoints", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hit Dice</FormLabel>
                <Input placeholder="Hit Dice" value={genericMonsterInfo.hitDice} type={"number"} onChange={(e) => handleChange("hitDice", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Size</FormLabel>
                <Input placeholder="Size" value={genericMonsterInfo.size} type={"number"} onChange={(e) => handleChange("size", Number(e.target.value))}/>
            </FormControl>
            <MovementBlock data={genericMonsterInfo.movement} onChange={updated => handleChange("movement", updated)} />
        </div>
    );
}

export {GenericInfoBlock};
