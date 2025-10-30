import {Request, Response} from "express";
import {Campaign} from "../models/schema";

export const getCampaigns = async (_req: Request, res: Response) => {
    const monsters = await Campaign.find();
    res.json(monsters);
};

export const getCampaignById = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ error: "Could not find campaign by ID: " + req.params.id });
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createCampaign = async (req: Request, res: Response) => {
    try {
        const { _id, ...data } = req.body; // ignore any _id
        const campaign = await Campaign.create(data);
        res.status(201).json(campaign);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateCampaign = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!campaign) return res.status(404).json({ error: "Could not find campaign by ID: " + req.params.id });
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteCampaign = async (req: Request, res: Response) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) return res.status(404).json({ error: "Could not find campaign by ID: " + req.params.id });
        res.json({ message: "Campaign deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};