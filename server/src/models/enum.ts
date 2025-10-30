export enum Size {
    TINY = 4,
    SMALL = 6,
    MEDIUM = 8,
    LARGE = 10,
    HUGE = 12,
    GARGANTUAN = 20,
    ERROR = -1,
}

export enum DamageType {
    ACID = "acid",
    COLD = "cold",
    FIRE = "fire",
    FORCE = "force",
    LIGHTNING = "lighting",
    NECROTIC = "necrotic",
    POISON = "poison",
    PSYCHIC = "psychic",
    RADIANT = "radiant",
    THUNDER = "thunder",
    PIERCING = "piercing",
    SLASHING = "slashing",
    BLUDGEONING = "bludgeoning",
    NON_MAGICAL = "non_magical",
    ERROR = "error",
}

export enum AttackRange {
    MELEE = "MELEE",
    RANGED = "RANGED",
    BOTH = "MELEE OR RANGED",
    ERROR = "ERROR",
}

export enum AT {
    ROUND_START = "round_start",
    ROUND_END = "round_end",
    TURN_START = "turn_start",
    TURN_END = "turn_end",
    TURN_END_OF_CHAR = "turn_end_of_char",
}

export enum Condition {
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
}

export enum Skill {
    ATHLETICS = "athletics",
    ACROBATICS = "acrobatics",
    SLEIGHT_OF_HAND = "sleight of hand",
    STEALTH = "stealth",
    ARCANA = "arcana",
    HISTORY = "history",
    INVESTIGATION = "investigation",
    NATURE = "nature",
    RELIGION = "religion",
    ANIMAL_HANDLING = "animal handling",
    INSIGHT = "insight",
    MEDICINE = "medicine",
    PERCEPTION = "perception",
    SURVIVAL = "survival",
    DECEPTION = "deception",
    INTIMIDATION = "intimidation",
    PERFORMANCE = "performance",
    PERSUASION = "persuasion",
}