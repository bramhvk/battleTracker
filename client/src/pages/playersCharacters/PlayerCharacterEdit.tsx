import {emptyPlayerCharacter, PlayerCharacter} from "../../types/player/PlayerCharacter";
import React, {useEffect, useState} from "react";
import {FormControl, FormLabel, Input, TextField} from "@mui/material";

import {StatBlock} from "../../components/shared/5e/StatBlock";
import {getPlayerCharacterById, updatePlayerCharacter} from "../../services/PlayerCharacterService";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {isStringNotEmpty} from "../../utils/validation";
import {MovementBlock} from "../../components/shared/5e/MovementBlock";

interface PlayerCharacterCreateProps {
}

const PlayerCharacterEdit: React.FC<PlayerCharacterCreateProps> = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.selectedId as string;

    const [data, setData] = useState<PlayerCharacter | null>(null)

    useEffect(() => {
        if (isStringNotEmpty(id)) {
            getPlayerCharacterById(id).then(setData)
        } else {
            setData(emptyPlayerCharacter)
        }
    }, [id]);

    //wait until data is loaded
    if (!data) return null;

    const save = () => {
        updatePlayerCharacter(data).then((pc: PlayerCharacter) => {
            console.log("saved!", pc);
            navigate("/player-characters/");
        });
    }

    return (
        <>
            {JSON.stringify(data)}
            <div>
                <div>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Name" value={data.name} type={"string"}
                               onChange={(e) => setData({...data, name: e.target.value})}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>AC</FormLabel>
                        <Input placeholder="AC" value={data.ac} type={"number"}
                               onChange={(e) => setData({...data, ac: Number(e.target.value)})}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Hit Points</FormLabel>
                        <Input placeholder="Hit Points" value={data.hitPoints} type={"number"}
                               onChange={(e) => setData({...data, hitPoints: Number(e.target.value)})}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Max HP</FormLabel>
                        <Input placeholder="Max Hit Points" value={data.maxHitPoints} type={"number"}
                               onChange={(e) => setData({...data, maxHitPoints: Number(e.target.value)})}/>
                    </FormControl>
                    <StatBlock data={data.stats} onChange={updated => setData({...data, stats: updated})}/>
                    <MovementBlock data={data.movement} onChange={updated => setData({...data, movement: updated})}/>
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
        </>
    );
}

export default PlayerCharacterEdit;