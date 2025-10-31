import {ID} from "../shared/Id";

export interface Encounter extends ID {
    name: string,
    monsters: ID[];
    players: ID[];
}

export const emptyEncounter = {
    _id : "",
    name: "",
    monsters : [],
    players : [],
} as Encounter;