import {emptyMonster, Monster} from "../types/Monster";
import {apiCall, apiCallBodied, Method} from "./ApiService";

const prefix = "api/monsters/"

//TODO: Add a filterObject which specifies which keys to fetch, so we dont get all the data all the time
export const getMonsters = () => apiCall<Monster[]>(Method.GET, prefix, []);

export const getMonsterById = (id: string) => apiCall<Monster>(Method.GET, prefix + `${id}`, emptyMonster)

export const createMonster = (monster: Monster) => apiCallBodied<Monster, Partial<Monster>>(Method.POST, prefix, monster, emptyMonster);

export const updateMonster = (id: string, monster: Monster) => apiCallBodied<Monster, Partial<Monster>>(Method.PUT, prefix, monster, emptyMonster);

export const deleteMonster = (id: string) => apiCall<Monster>(Method.DELETE, prefix + `${id}`, emptyMonster);

