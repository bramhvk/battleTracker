import {Encounter} from "../encounters/Encounter";
import {ID} from "../shared/Id";
import {PlayerCharacter} from "../player/PlayerCharacter";

export interface Campaign extends ID {
    encounters: Encounter[];
    players: PlayerCharacter[];
}