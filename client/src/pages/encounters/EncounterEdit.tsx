import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {emptyEncounter, Encounter} from "../../types/encounters/Encounter";
import {PlayerCharacter} from "../../types/player/PlayerCharacter";
import {Monster} from "../../types/monster/Monster";
import {createEncounter, getEncounterById} from "../../services/EncounterService";
import {getPlayerCharacters} from "../../services/PlayerCharacterService";
import {getMonsters} from "../../services/MonsterService";
import {createId} from "../../types/shared/Id";
import {Checkbox, FormControl, FormLabel, Input, ListItemText, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";

const EncounterEdit: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id as string | undefined;
    const encounter = location.state?.monster as Encounter | undefined;
    const [data, setData] = useState<Encounter | null>(null);
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [selectedMonsters, setSelectedMonsters] = useState<string[]>([]);
    const [playerCharacters, setPlayerCharacters] = useState<PlayerCharacter[]>([]);
    const [selectedPlayerCharacters, setSelectedPlayerCharacters] = useState<string[]>([]);


    useEffect(() => {
        if (encounter) {
            setData(encounter);
        } else {
            if (id) {
                getEncounterById(id).then(setData)
            } else {
                setData(emptyEncounter)
            }
        }

        getMonsters().then(setMonsters);
        getPlayerCharacters().then(setPlayerCharacters);
    }, []);

    //wait until data is loaded
    if (!data) return null;

    const save = () => {
        createEncounter({
            name: data.name,
            monsters: selectedMonsters.map(createId),
            players: selectedPlayerCharacters.map(createId),
        } as Encounter)
            .then((e: Encounter) => {
                console.log("saved!", e);
                navigate("/encounters/");
            });
    }

    return (
        <div>
            <div>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Name" value={data.name} type={"string"}
                           onChange={(e) => setData({...data, name: e.target.value})}/>
                </FormControl>

                <FormControl>
                    <FormLabel>Monsters</FormLabel>
                    <Select
                        variant={"outlined"}
                        multiple
                        value={selectedMonsters}
                        onChange={(e) => setSelectedMonsters(e.target.value as string[])}
                        renderValue={(selected) =>
                            monsters
                                .filter((e) => selected.includes(e._id))
                                .map((e) => e.name)
                                .join(", ")
                        }
                    >
                        {monsters.map((monster) => (
                            <MenuItem key={monster._id} value={monster._id}>
                                <Checkbox checked={selectedMonsters.includes(monster._id)}/>
                                <ListItemText primary={monster.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Player Characters</FormLabel>
                    <Select
                        variant={"outlined"}
                        multiple
                        value={selectedPlayerCharacters}
                        onChange={(e) => setSelectedPlayerCharacters(e.target.value as string[])}
                        renderValue={(selected) =>
                            playerCharacters
                                .filter((p) => selected.includes(p._id))
                                .map((p) => p.name)
                                .join(", ")
                        }
                    >
                        {playerCharacters.map((p) => (
                            <MenuItem key={p._id} value={p._id}>
                                <Checkbox checked={selectedPlayerCharacters.includes(p._id)}/>
                                <ListItemText primary={p.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button onClick={save}>Save</Button>
            </div>
        </div>
    );
}

export default EncounterEdit;