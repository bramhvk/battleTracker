import {emptyMonster, Monster} from "../types/Monster";
import {apiCall, apiCallBodied} from "./ApiService";

const prefix = "api/monsters/"

//TODO: Add a filterObject which specifies which keys to fetch, so we dont get all the data all the time
export const getMonsters = () => apiCall<Monster[]>("GET", prefix, []);

export const getMonsterById = (id: string) => apiCall<Monster>("GET", prefix + `${id}`, emptyMonster)

export const createMonster = (monster: Monster) => apiCallBodied<Monster, Partial<Monster>>("POST", prefix, monster, emptyMonster);

export const updateMonster = (id: string, monster: Monster) => apiCallBodied<Monster, Partial<Monster>>("PUT", prefix, monster, emptyMonster);

export const deleteMonster = (id: string) => apiCall<Monster>("DELETE", prefix + `${id}`, emptyMonster);

