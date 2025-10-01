import {Document, Schema} from "mongoose";

export interface IStats extends Document {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

const StatsSchema: Schema = new Schema({
    str: { type: Number, required: true },
    dex: { type: Number, required: true },
    con: { type: Number, required: true },
    int: { type: Number, required: true },
    wis: { type: Number, required: true },
    cha: { type: Number, required: true },
});

export default StatsSchema;