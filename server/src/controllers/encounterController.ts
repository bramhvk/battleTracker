import {Request, Response} from "express";
import {Encounter} from "../models/schema";

export const getEncounters = async (_req: Request, res: Response) => {
    const monsters = await Encounter.find();
    res.json(monsters);
};

export const getEncounterById = async (req: Request, res: Response) => {
    try {
        const encounter = await Encounter.findById(req.params.id);
        if (!encounter) return res.status(404).json({ error: "Could not find encounter by ID: " + req.params.id });
        res.json(encounter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createEncounter = async (req: Request, res: Response) => {
    try {
        const { _id, ...monsterData } = req.body; // ignore any _id
        const encounter = await Encounter.create(monsterData);
        res.status(201).json(encounter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateEncounter = async (req: Request, res: Response) => {
    try {
        const encounter = await Encounter.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!encounter) return res.status(404).json({ error: "Could not find encounter by ID: " + req.params.id });
        res.json(encounter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteEncounter = async (req: Request, res: Response) => {
    try {
        const encounter = await Encounter.findByIdAndDelete(req.params.id);
        if (!encounter) return res.status(404).json({ error: "Could not find encounter by ID: " + req.params.id });
        res.json({ message: "Encounter deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};