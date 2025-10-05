import {IMovement} from "./movement";

export interface IMonsterInfo  extends Document {
    name: string;
    ac: number;
    hitDice: number;
    size: number;
    movement: IMovement;
}