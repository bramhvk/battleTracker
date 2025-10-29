import {Movement} from "./Movement";
import {Stats} from "./Stats";
import {Proficiency} from "./Proficiency";

export interface PlayerCharacter {
    _id: string;
    name: string;
    stats: Stats;
    ac: number;
    hitPoints: number;
    maxHitPoints: number;
    movement: Movement;
    proficiency: Proficiency;
}