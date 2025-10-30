import {FormControl, FormLabel, Input} from "@mui/material";
import {useEffect, useState} from "react";
import {emptyGenericMonsterInfo, GenericMonsterInfo} from "../../../types/monster/Monster";


interface MonsterInfoProps {
    data: GenericMonsterInfo;
    providedText?: string;
}

export const MonsterInfo: React.FC<MonsterInfoProps> = ({data, providedText}) => {

    const [genericMonsterInfo, setGenericMonsterInfo] = useState(emptyGenericMonsterInfo);

    useEffect(() => { setGenericMonsterInfo(data); }, [data]);

    return (
        <div>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" value={genericMonsterInfo.name} type={"string"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, name: e.target.value})} />
            </FormControl>
            <FormControl>
                <FormLabel>AC</FormLabel>
                <Input placeholder="AC" value={genericMonsterInfo.ac} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, ac: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hit Points</FormLabel>
                <Input placeholder="Hit Points" value={genericMonsterInfo.hitPoints} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, hitPoints: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hit Dice</FormLabel>
                <Input placeholder="Hit Dice" value={genericMonsterInfo.hitDice} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, hitDice: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Size</FormLabel>
                <Input placeholder="Size" value={genericMonsterInfo.size} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, size: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Speed</FormLabel>
                <Input placeholder="Speed" value={genericMonsterInfo.movement.speed} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, movement: {...genericMonsterInfo.movement, speed: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Fly Speed</FormLabel>
                <Input placeholder="Fly Speed" value={genericMonsterInfo.movement.fly} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, movement: {...genericMonsterInfo.movement, fly: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hover Speed</FormLabel>
                <Input placeholder="Hover Speed" value={genericMonsterInfo.movement.hover} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, movement: {...genericMonsterInfo.movement, hover: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Swim Speed</FormLabel>
                <Input placeholder="Swim Speed" value={genericMonsterInfo.movement.swim} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, movement: {...genericMonsterInfo.movement, swim: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Burrow Speed</FormLabel>
                <Input placeholder="Burrow Speed" value={genericMonsterInfo.movement.burrow} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, movement: {...genericMonsterInfo.movement, burrow: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Climb Speed</FormLabel>
                <Input placeholder="Climb Speed" value={genericMonsterInfo.movement.climb} type={"number"} onChange={(e) => setGenericMonsterInfo({...genericMonsterInfo, movement: {...genericMonsterInfo.movement, climb: Number(e.target.value)}})}/>
            </FormControl>
        </div>
    );
}
