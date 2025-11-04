import {emptyMovement, Movement} from "../shared/Movement";
import {emptyStats, Stats} from "../shared/Stats";
import {ID} from "../shared/Id";

export interface PlayerCharacter extends ID {
    stats: Stats;
    ac: number;
    hitPoints: number;
    maxHitPoints: number;
    movement: Movement;
    proficiencies: String[];
}

export const emptyPlayerCharacter = {
    _id: "",
    name: "",
    stats: emptyStats,
    ac: 0,
    hitPoints: 0,
    maxHitPoints: 0,
    movement: emptyMovement,
    proficiencies: []
} as PlayerCharacter;