import mongoose, {Schema, Document} from "mongoose";
import StatsSchema, {IStats} from "./stats";
import {IMovement} from "./movement";


export interface IMonster extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    ac: number;
    hitDice: number;
    size: number;
    movement: IMovement;
    stats: IStats;
    savingThrows?: IStats;
    // skills: string[];
    // senses: string[];
    immunities: string[];
    resistances: string[];
    // conditions_immunities: string[];
    // languages: string[];
    // abilities: string[];
    // actions: string[];
}



const MonsterSchema: Schema = new Schema({
    _id: {type: String, required: true},
    name: { type: String, required: true },
    ac: { type: Number, required: true },
    hitDice: { type: Number, required: true },
    size: { type: Number, required: true },
    movement: {
        speed: { type: Number, required: false },
        fly: { type: Number, required: false },
        burrow: { type: Number, required: false },
        swim: { type: Number, required: false },
    },
    stats: {type: StatsSchema, required: true },
    // skills: { type: [String], default: [] },
    // senses: { type: [String], default: [] },
    savingThrows: {type: StatsSchema, required: false},
    immunities: { type: [String], default: [] },
    resistances: { type: [String], default: [] },
    // conditions_immunities: { type: [String], default: [] },
    // languages: { type: [String], default: [] },
    //
    // abilities: { type: [String], default: [] },
    // actions: { type: [String], default: [] },
});

export default mongoose.model<IMonster>('Monster', MonsterSchema);