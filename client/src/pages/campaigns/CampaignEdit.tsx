import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getPlayerCharacters} from "../../services/PlayerCharacterService";
import {Campaign, emptyCampaign} from "../../types/campaign/Campaign";
import {createCampaign, getCampaignById} from "../../services/CampaignService";
import {Checkbox, FormControl, FormLabel, Input, ListItemText, MenuItem, Select} from "@mui/material";
import {getEncounters} from "../../services/EncounterService";
import Button from "@mui/material/Button";
import {Encounter} from "../../types/encounters/Encounter";
import {PlayerCharacter} from "../../types/player/PlayerCharacter";
import {createId} from "../../types/shared/Id";

const CampaignEdit: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state?.id as string | undefined;
    const campaign = location.state?.monster as Campaign | undefined;
    const [data, setData] = useState<Campaign | null>(null)
    const [encounters, setEncounters] = useState<Encounter[]>([])
    const [selectedEncounters, setSelectedEncounters] = useState<string[]>([])
    const [playerCharacters, setPlayerCharacters] = useState<PlayerCharacter[]>([])
    const [selectedPlayerCharacters, setSelectedPlayerCharacters] = useState<string[]>([])

    useEffect(() => {
        if (campaign) {
            setData(campaign);
        } else {
            if (id) {
                getCampaignById(id).then(setData)
            } else {
                setData(emptyCampaign)
            }
        }

        getEncounters().then(setEncounters);
        getPlayerCharacters().then(setPlayerCharacters);
    }, []);

    //wait until data is loaded
    if (!data) return null;

    const save = () => {
        createCampaign({
            name: data.name,
            encounters: selectedEncounters.map(createId),
            players: selectedPlayerCharacters.map(createId),
        } as Campaign)
            .then((c: Campaign) => {
                console.log("saved!", c);
                navigate("/campaigns/");
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
                    <FormLabel>Encounters</FormLabel>
                    <Select
                        variant={"outlined"}
                        multiple
                        value={selectedEncounters}
                        onChange={(e) => setSelectedEncounters(e.target.value as string[])}
                        renderValue={(selected) =>
                            encounters
                                .filter((e) => selected.includes(e._id))
                                .map((e) => e.name)
                                .join(", ")
                        }
                    >
                        {encounters.map((encounter) => (
                            <MenuItem key={encounter._id} value={encounter._id}>
                                <Checkbox checked={selectedEncounters.includes(encounter._id)}/>
                                <ListItemText primary={encounter.name}/>
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

export default CampaignEdit;