import {ID} from "../shared/Id";
import {Monster} from "../monster/Monster";
import {PlayerCharacter} from "../player/PlayerCharacter";

export interface Encounter extends ID {
    monsters: Monster[];
    characters: PlayerCharacter[];
}