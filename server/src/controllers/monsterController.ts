import {Request, Response} from "express";
import {Monster} from "../models/schema";

export const getMonsters = async (_req: Request, res: Response) => {
    const monsters = await Monster.find();
    res.json(monsters);
};

export const getMonsterById = async (req: Request, res: Response) => {
    try {
        const monster = await Monster.findById(req.params.id);
        if (!monster) return res.status(404).json({ error: "Could not find monster by ID: " + req.params.id });
        res.json(monster);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createMonster = async (req: Request, res: Response) => {
    try {
        const { _id, ...monsterData } = req.body; // ignore any _id
        const monster = await Monster.create(monsterData);
        res.status(201).json(monster);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateMonster = async (req: Request, res: Response) => {
    try {
        const monster = await Monster.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!monster) return res.status(404).json({ error: "Could not find monster by ID: " + req.params.id });
        res.json(monster);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteMonster = async (req: Request, res: Response) => {
    try {
        const monster = await Monster.findByIdAndDelete(req.params.id);
        if (!monster) return res.status(404).json({ error: "Could not find monster by ID: " + req.params.id });
        res.json({ message: "Monster deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};