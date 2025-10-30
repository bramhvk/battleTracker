import {emptyPlayerCharacter, PlayerCharacter} from "../types/player/PlayerCharacter";
import {apiCall, apiCallBodied} from "./ApiService";

const prefix = "/api/player-characters/"

//TODO: Add a filterObject which specifies which keys to fetch, so we dont get all the data all the time
export const getPlayerCharacters = () => apiCall<PlayerCharacter[]>("GET", prefix, []);

export const getPlayerCharacterById = (id: string) => apiCall<PlayerCharacter>("GET", prefix + `${id}`, emptyPlayerCharacter)

export const createPlayerCharacter = (monster: PlayerCharacter) => apiCallBodied<PlayerCharacter, Partial<PlayerCharacter>>("POST", prefix, monster, emptyPlayerCharacter);

export const updatePlayerCharacter = (id: string, monster: PlayerCharacter) => apiCallBodied<PlayerCharacter, Partial<PlayerCharacter>>("PUT", prefix, monster, emptyPlayerCharacter);

export const deletePlayerCharacter = (id: string) => apiCall<PlayerCharacter>("DELETE", prefix + `${id}`, emptyPlayerCharacter);

