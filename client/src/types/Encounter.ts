import {Monster} from "./Monster";
import {Character} from "./Character";

export interface Encounter {
    monsters: Monster[];
    characters: Character[];
}