import {Movement} from "./Movement";

export interface Character {
    _id: string;
    name: string;
    ac: number;
    hitPoints: number;
    movement: Movement;
}