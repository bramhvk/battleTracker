import {Trigger} from "./Trigger";

export interface Trait {
    name: string;
    text: string;
    amount?: number;
    triggers?: Trigger[];
}

export const emptyTrait = {
    name: "",
    text: "",
    triggers: [],
} as Trait;