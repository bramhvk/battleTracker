import {emptyMovement, Movement} from "../../../types/shared/Movement";
import {FormControl, FormLabel, Input} from "@mui/material";
import {useEffect, useState} from "react";

interface MovementProps {
    data: Movement;
    onChange: (update: Movement) => void;
}

const MovementBlock: React.FC<MovementProps> = ({data, onChange}) => {

    const [movement, setMovement] = useState(emptyMovement)

    useEffect(() => {
        setMovement(data)
    }, [data])

    const handleChange = (key: keyof Movement, value: number) => {
        onChange({...data, [key]: value});
    }

    return (
        <>
            <FormControl>
                <FormLabel>Speed</FormLabel>
                <Input placeholder="Speed" value={movement.speed} type={"number"}
                       onChange={(e) => handleChange("speed", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Fly Speed</FormLabel>
                <Input placeholder="Fly Speed" value={movement.fly} type={"number"}
                       onChange={(e) => handleChange("fly", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hover Speed</FormLabel>
                <Input placeholder="Hover Speed" value={movement.hover} type={"number"}
                       onChange={(e) => handleChange("hover", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Swim Speed</FormLabel>
                <Input placeholder="Swim Speed" value={movement.swim} type={"number"}
                       onChange={(e) => handleChange("swim", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Burrow Speed</FormLabel>
                <Input placeholder="Burrow Speed" value={movement.burrow} type={"number"}
                       onChange={(e) => handleChange("burrow", Number(e.target.value))}/>
            </FormControl>
            <FormControl>
                <FormLabel>Climb Speed</FormLabel>
                <Input placeholder="Climb Speed" value={movement.climb} type={"number"}
                       onChange={(e) => handleChange("climb", Number(e.target.value))}/>
            </FormControl>
        </>
    )
}

export {MovementBlock};