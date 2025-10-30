import {InferSchemaType, model, Schema} from "mongoose";
import {AT, AttackRange, DamageType, Size, Skill} from "./enum";


export const TriggerSchema = new Schema({
    source: { type: String, required: true },
    desc: { type: String, required: true },
    dc: { type: Number, required: true },
    at: { type: String, enum: Object.values(AT), required: true },
});

export const TraitSchema = new Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    amount: { type: Number },
    triggers: { type: [TriggerSchema], default: [] },
});

export const StatsSchema = new Schema({
    str: { type: Number, required: true },
    dex: { type: Number, required: true },
    con: { type: Number, required: true },
    int: { type: Number, required: true },
    wis: { type: Number, required: true },
    cha: { type: Number, required: true },
});

export const SensesSchema = new Schema({
    perception: Number,
    darkvision: Number,
    blindsight: Number,
    tremorsense: Number,
    truesight: Number,
});

export const MovementSchema = new Schema({
    speed: Number,
    fly: Number,
    hover: Number,
    burrow: Number,
    swim: Number,
    climb: Number,
});

export const DamageSchema = new Schema({
    die: { type: Number, required: true },
    amount: { type: Number, required: true },
    bonus: { type: Number, required: true },
    type: { type: String, enum: Object.values(DamageType), required: true },
});

const AttackSchema = new Schema({
    ...TraitSchema.obj, // spread from Trait
    type: { type: String, enum: Object.values(AttackRange), required: true },
    bonus: { type: Number, required: true },
    range: { type: String, required: true },
    reach: { type: String, required: true },
    target: { type: String, required: true },
    damage: { type: [DamageSchema], required: true },
    isMagical: { type: Boolean, required: true },
});

const SpellSchema = new Schema({
    ...AttackSchema.obj,
    isSpell: { type: Boolean, default: true },
    isMagical: { type: Boolean, default: true },
    level: { type: String, required: true },
    schools: { type: [String], required: true },
    components: { type: [String], required: true },
    duration: { type: String, required: true },
    castingTime: { type: String, required: true },
    dc: { type: Number },
});

const ProficiencySchema = new Schema({
    value: {
        type: String,
        enum: [
            // Stats keys
            "str", "dex", "con", "int", "wis", "cha",
            // Skills values
            ...Object.values(Skill),
        ],
        required: true,
    },
});


const GenericMonsterInfoSchema = new Schema({
    name: { type: String, required: true },
    ac: { type: Number, required: true },
    hitPoints: { type: Number, required: true },
    hitDice: { type: Number, required: true },
    movement: { type: MovementSchema, required: true },
    size: { type: String, enum: Object.values(Size), required: true },
    languages: { type: String, required: true },
    cr: { type: Number, required: true },
});

const LegendaryActionSchema = new Schema({
    ...TraitSchema.obj,
    cost: { type: String, required: true },
});

// --- PlayerCharacter ---
const PlayerCharacterSchema = new Schema({
    name: { type: String, required: true },
    stats: { type: StatsSchema, required: true },
    ac: { type: Number, required: true },
    hitPoints: { type: Number, required: true },
    maxHitPoints: { type: Number, required: true },
    movement: { type: MovementSchema, required: true },
    proficiency: { type: ProficiencySchema, required: true },
});

// --- Monster ---
const MonsterSchema = new Schema({
    info: { type: GenericMonsterInfoSchema, required: true },
    stats: { type: StatsSchema, required: true },
    proficiencies: { type: [String], required: true },
    senses: { type: SensesSchema, required: true },
    immunities: {
        type: [String],
        enum: Object.values(DamageType),
        default: [],
    },
    resistances: {
        type: [String],
        enum: Object.values(DamageType),
        default: [],
    },
    conditions: { type: [String], default: [] },
    abilities: { type: [TraitSchema], default: [] },
    actions: { type: [TraitSchema], default: [] },
    reactions: { type: [TraitSchema], default: [] },
    bActions: { type: [TraitSchema], default: [] },
    lActions: { type: [LegendaryActionSchema], default: [] },
    rEffects: { type: [TraitSchema], default: [] },
});

// --- Encounter ---
const EncounterSchema = new Schema({
    monsters: { type: [MonsterSchema], required: true },
    characters: { type: [PlayerCharacterSchema], required: true },
});

// --- Campaign ---
const CampaignSchema = new Schema({
    encounters: { type: [EncounterSchema], default: [] },
    players: { type: [PlayerCharacterSchema], default: [] },
});

// --- Types and Models ---
export type IPlayerCharacter = InferSchemaType<typeof PlayerCharacterSchema>;
export const PlayerCharacter = model<IPlayerCharacter>(
    "PlayerCharacter",
    PlayerCharacterSchema
);

export type IMonster = InferSchemaType<typeof MonsterSchema>;
export const Monster = model<IMonster>("Monster", MonsterSchema);

export type IEncounter = InferSchemaType<typeof EncounterSchema>;
export const Encounter = model<IEncounter>("Encounter", EncounterSchema);

export type ICampaign = InferSchemaType<typeof CampaignSchema>;
export const Campaign = model<ICampaign>("Campaign", CampaignSchema);

