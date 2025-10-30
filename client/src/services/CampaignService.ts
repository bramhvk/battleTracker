import {apiCall, apiCallBodied} from "./ApiService";
import {Campaign, emptyCampaign} from "../types/campaign/Campaign";

const prefix = "/api/campaigns/"

//TODO: Add a filterObject which specifies which keys to fetch, so we dont get all the data all the time
export const getCampaigns = () => apiCall<Campaign[]>("GET", prefix, []);

export const getCampaignById = (id: string) => apiCall<Campaign>("GET", prefix + `${id}`, emptyCampaign)

export const createCampaign = (monster: Campaign) => apiCallBodied<Campaign, Partial<Campaign>>("POST", prefix, monster, emptyCampaign);

export const updateCampaign = (id: string, monster: Campaign) => apiCallBodied<Campaign, Partial<Campaign>>("PUT", prefix, monster, emptyCampaign);

export const deleteCampaign = (id: string) => apiCall<Campaign>("DELETE", prefix + `${id}`, emptyCampaign);

