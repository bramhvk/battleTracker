import {emptyEncounter, Encounter} from "../types/encounters/Encounter";
import {apiCall, apiCallBodied} from "./ApiService";

const prefix = "/api/encounters/"

//TODO: Add a filterObject which specifies which keys to fetch, so we dont get all the data all the time
export const getEncounters = () => apiCall<Encounter[]>("GET", prefix, []);

export const getEncounterById = (id: string) => apiCall<Encounter>("GET", prefix + `${id}`, emptyEncounter)

export const createEncounter = (monster: Encounter) => apiCallBodied<Encounter, Partial<Encounter>>("POST", prefix, monster, emptyEncounter);

export const updateEncounter = (id: string, monster: Encounter) => apiCallBodied<Encounter, Partial<Encounter>>("PUT", prefix, monster, emptyEncounter);

export const deleteEncounter = (id: string) => apiCall<Encounter>("DELETE", prefix + `${id}`, emptyEncounter);

