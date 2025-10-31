import {emptyPlayerCharacter, PlayerCharacter} from "../../types/player/PlayerCharacter";
import React, {useEffect, useState} from "react";
import {FormControl, FormLabel, Input, TextField} from "@mui/material";

import {StatBlock} from "../../components/shared/5e/StatBlock";
import {createPlayerCharacter, getPlayerCharacterById} from "../../services/PlayerCharacterService";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

interface PlayerCharacterCreateProps {
}

const PlayerCharacterEdit: React.FC<PlayerCharacterCreateProps> = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id as string | undefined;
    const playerCharacter  = location.state?.monster as PlayerCharacter | undefined;
    const [data, setData] = useState<PlayerCharacter | null>(null)

    useEffect(() => {
        if (playerCharacter) {
            setData(playerCharacter);
        } else {
            if (id) {
                getPlayerCharacterById(id).then(setData)
            } else {
                setData(emptyPlayerCharacter)
            }
        }
    }, []);
    
    //wait until data is loaded
    if (!data) return null;
    
    const save = () => {
        createPlayerCharacter(data).then((pc: PlayerCharacter) => {
            console.log("saved!", pc);
            navigate("/player-characters/");
        });
    }

    return (
        <div>
        <div>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" value={data.name} type={"string"} onChange={(e) => setData({...data, name: e.target.value})} />
            </FormControl>
            <FormControl>
                <FormLabel>AC</FormLabel>
                <Input placeholder="AC" value={data.ac} type={"number"} onChange={(e) => setData({...data, ac: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Stats</FormLabel>
                <StatBlock data={data.stats} />
            </FormControl>
            <FormControl>
                <FormLabel>Hit Points</FormLabel>
                <Input placeholder="Hit Points" value={data.hitPoints} type={"number"} onChange={(e) => setData({...data, hitPoints: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Max HP</FormLabel>
                <Input placeholder="MAx Hit Points" value={data.maxHitPoints} type={"number"} onChange={(e) => setData({...data, maxHitPoints: Number(e.target.value)})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Speed</FormLabel>
                <Input placeholder="Speed" value={data.movement.speed} type={"number"} onChange={(e) => setData({...data, movement: {...data.movement, speed: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Fly Speed</FormLabel>
                <Input placeholder="Fly Speed" value={data.movement.fly} type={"number"} onChange={(e) => setData({...data, movement: {...data.movement, fly: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Hover Speed</FormLabel>
                <Input placeholder="Hover Speed" value={data.movement.hover} type={"number"} onChange={(e) => setData({...data, movement: {...data.movement, hover: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Swim Speed</FormLabel>
                <Input placeholder="Swim Speed" value={data.movement.swim} type={"number"} onChange={(e) => setData({...data, movement: {...data.movement, swim: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Burrow Speed</FormLabel>
                <Input placeholder="Burrow Speed" value={data.movement.burrow} type={"number"} onChange={(e) => setData({...data, movement: {...data.movement, burrow: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <FormLabel>Climb Speed</FormLabel>
                <Input placeholder="Climb Speed" value={data.movement.climb} type={"number"} onChange={(e) => setData({...data, movement: {...data.movement, climb: Number(e.target.value)}})}/>
            </FormControl>
            <FormControl>
                <TextField
                    label="Proficiencies (comma-separated)"
                    multiline
                    minRows={2}
                    value={data.proficiencies.join(", ")}
                    onChange={(e) =>
                        setData({
                            ...data,
                            proficiencies: e.target.value.split(",").map((s) => s.trim()),
                        })
                    }
                    fullWidth
                />
            </FormControl>
        </div>
            <div>
                <Button onClick={save}>Save</Button>
            </div>
        </div>
    );
}

export default PlayerCharacterEdit;