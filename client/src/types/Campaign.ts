import {Encounter} from "./Encounter";
import {PlayerCharacter} from "./PlayerCharacter";

export interface Campaign {
    encounters: Encounter[];
    players: PlayerCharacter[];
}