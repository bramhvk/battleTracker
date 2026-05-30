import {FormControl, FormLabel, Input} from "@mui/material";
import React from "react";

interface NumberInputProps<T> {
    label: string;
    keyName: keyof T;
    data: T;
    onChange: (updated: T) => void;
}

function NumberInput<T extends Object>({label, keyName, data, onChange}: NumberInputProps<T>) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({...data, [keyName]: Number(e.target.value)})
    }

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input placeholder={label} value={String(data[keyName] ?? "")} type={"number"} onChange={handleChange} />
        </FormControl>
    )
}

export {NumberInput};