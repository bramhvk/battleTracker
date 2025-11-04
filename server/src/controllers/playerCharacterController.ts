import {Request, Response} from "express";
import {PlayerCharacter} from "../models/schema";

export const getPlayerCharacters = async (_req: Request, res: Response) => {
    const playerCharacters = await PlayerCharacter.find();
    res.json(playerCharacters);
};

export const getPlayerCharacterById = async (req: Request, res: Response) => {
    try {
        const playerCharacter = await PlayerCharacter.findById(req.params.id);
        if (!playerCharacter) return res.status(404).json({ error: "Could not find PlayerCharacter by ID: " + req.params.id });
        res.json(playerCharacter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getPlayerCharactersForIds = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const playerCharacters = Promise.all((req.params.ids as string[]).map(id => PlayerCharacter.findById(id)));
        if (!playerCharacters) return res.status(404).json({ error: "Could not find PlayerCharacter by ID: " + req.params.id });
        res.json(playerCharacters);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createPlayerCharacter = async (req: Request, res: Response) => {
    try {
        const { _id, ...data } = req.body; // ignore any _id
        const playerCharacter = await PlayerCharacter.create(data);
        res.status(201).json(playerCharacter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updatePlayerCharacter = async (req: Request, res: Response) => {
    try {
        const playerCharacter = await PlayerCharacter.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!playerCharacter) return res.status(404).json({ error: "Could not find PlayerCharacter by ID: " + req.params.id });
        res.json(playerCharacter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deletePlayerCharacter = async (req: Request, res: Response) => {
    try {
        const playerCharacter = await PlayerCharacter.findByIdAndDelete(req.params.id);
        if (!playerCharacter) return res.status(404).json({ error: "Could not find PlayerCharacter by ID: " + req.params.id });
        res.json({ message: "PlayerCharacter deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};