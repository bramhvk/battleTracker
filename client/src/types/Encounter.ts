import {Monster} from "./Monster";
import {PlayerCharacter} from "./PlayerCharacter";

export interface Encounter {
    monsters: Monster[];
    characters: PlayerCharacter[];
}