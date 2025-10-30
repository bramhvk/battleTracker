import {Movement} from "../shared/Movement";
import {Stats} from "../shared/Stats";
import {Proficiency} from "../shared/Proficiency";
import {ID} from "../shared/Id";

export interface PlayerCharacter extends ID {
    name: string;
    stats: Stats;
    ac: number;
    hitPoints: number;
    maxHitPoints: number;
    movement: Movement;
    proficiency: Proficiency;
}