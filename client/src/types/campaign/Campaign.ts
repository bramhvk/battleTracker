import {ID} from "../shared/Id";

export interface Campaign extends ID {
    encounters: ID[];
    players: ID[];
}

export const emptyCampaign = {
    _id: "",
    name: "",
    encounters: [],
    players: [],
} as Campaign;