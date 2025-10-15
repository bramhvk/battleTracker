import {Trigger} from "./Trigger";
import {Attack} from "./Attack";

export interface Trait {
    name: string;
    text: string;
    amount: number;
    attacks?: Attack[];
    triggers?: Trigger[];
}

export const emptyTrait = {
    name: "",
    text: "",
    amount: 0,
    attacks: [],
    triggers: [],
} as Trait;