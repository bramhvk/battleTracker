import {emptyMovement, Movement} from "./Movement";
import {Size} from "./Size";

export interface GenericInfo {
    name: string;
    ac: number;
    hitPoints: number;
    hitDice: number;
    movement: Movement;
    size: Size,
    languages: string,
    cr: number;
}

const emptyGenericInfoObject: GenericInfo = {
    name: "",
    ac: 0,
    hitDice: 0,
    hitPoints: 0,
    movement: emptyMovement,
    size: Size.MEDIUM,
    languages: "",
    cr: 0,
}

export const emptyGenericInfo: GenericInfo = {...emptyGenericInfoObject}