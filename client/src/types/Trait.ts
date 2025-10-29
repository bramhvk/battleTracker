import {Trigger} from "./Trigger";

export interface Trait {
    name: string;
    text: string;
    amount: number;
    triggers?: Trigger[];
}

export const emptyTrait = {
    name: "",
    text: "",
    amount: 0,
    // attacks: [],
    triggers: [],
} as Trait;