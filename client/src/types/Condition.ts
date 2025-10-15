export const conditions = ["blinded", "charmed", "deafened", "frightened", "grappled", "incapacitated", "invisible", "paralyzed", "petrified", "poisoned", "prone", "restrained", "stunned", "unconscious", "exhaustion"];

export enum Condition {
    // Core 5e Conditions
    BLINDED = "blinded",
    CHARMED = "charmed",
    DEAFENED = "deafened",
    FRIGHTENED = "frightened",
    GRAPPLED = "grappled",
    INCAPACITATED = "incapacitated",
    INVISIBLE = "invisible",
    PARALYZED = "paralyzed",
    PETRIFIED = "petrified",
    POISONED = "poisoned",
    PRONE = "prone",
    RESTRAINED = "restrained",
    STUNNED = "stunned",
    UNCONSCIOUS = "unconscious",
    EXHAUSTION = "exhaustion",
    ERROR = "error",

    // Optional / DMG / Commonly Used
    // Diseased = "Diseased",
    // Concentrating = "Concentrating",
    // Dead = "Dead",
    // Stable = "Stable",
    // Madness = "Madness",
    // Fatigue = "Fatigue", // 2024 replacement for Exhaustion
    // Strife = "Strife",   // 2024 companion to Fatigue
}

export const getConditionFrom = (key: string) => {
    if (key === undefined) return Condition.ERROR;

    const normalized = key.trim().toUpperCase();

    if (normalized in Condition) {
        return Condition[normalized as keyof typeof Condition];
    }

    return Condition.ERROR;
}