import mongoose, {Document, Schema} from "mongoose";
import StatsSchema, {IStats} from "./stats";
import {IMonsterInfo} from "./monsterInfo";


export interface IMonster extends Document {
    _id: mongoose.Types.ObjectId;
    info: IMonsterInfo;
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
    _id: {type: mongoose.Types.ObjectId, required: true},
    info: {
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
    },
    stats: {type: StatsSchema, required: true },
    proficiencies: {type: [String], required: true },
    // skills: { type: [String], default: [] },
    senses: { type: [String], default: [] },
    savingThrows: {type: StatsSchema, required: false},
    immunities: { type: [String], default: [] },
    resistances: { type: [String], default: [] },
    conditions: { type: [String], default: [] },
    // languages: { type: [String], default: [] },
    //
    // abilities: { type: [String], default: [] },
    // actions: { type: [String], default: [] },
});

export default mongoose.model<IMonster>('Monster', MonsterSchema);