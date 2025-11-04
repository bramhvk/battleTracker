import {useEffect, useState} from "react";
import {emptyEncounter, Encounter} from "../../types/encounters/Encounter";
import {getEncounterById} from "../../services/EncounterService";
import {useLocation} from "react-router-dom";
import {getPlayerCharactersForIds} from "../../services/PlayerCharacterService";
import {getMonstersForIds} from "../../services/MonsterService";
import {PlayerCharacter} from "../../types/player/PlayerCharacter";
import {Monster} from "../../types/monster/Monster";
import {createInitiativeEntry, InitiativeEntry} from "./type/InitiativeEntry";
import InitiativeDialog from "./dialog/InitiativeDialog";

interface BattlerTrackerProps {

}

const BattleTracker: React.FC<BattlerTrackerProps> = () => {

    const location = useLocation();
    const id = location.state?.id as string | undefined;

    const [encounter, setEncounter] = useState<Encounter>(emptyEncounter);
    const [players, setPlayers] = useState<PlayerCharacter[]>([]);
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [entries, setEntries] = useState<InitiativeEntry[]>([])

    useEffect(() => {
        if (id) {
            getEncounterById(id).then(e => {
                setEncounter(e);

                Promise.all([
                    getPlayerCharactersForIds(e.players),
                    getMonstersForIds(e.monsters)
                ]).then(([fPlayers, fMonsters]) => {
                    setPlayers(fPlayers);
                    setMonsters(fMonsters);
                    setEntries([...fMonsters.map(createInitiativeEntry), ...fPlayers.map(createInitiativeEntry)]);
                    console.log(fPlayers, fMonsters);
                });
            });
        }
    }, [id]);

    if (!encounter && entries.length > 0) return null;

    return (
        <div>
            <p>{id ?? "wrong"}</p>
            { JSON.stringify(entries, null, 2)  }
            <InitiativeDialog entities={entries} open={true} />
        </div>
    );
}

export default BattleTracker;