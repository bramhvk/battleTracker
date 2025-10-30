export const damageTypes = ["acid", "cold", "fire", "force", "lighting", "necrotic", "poison", "psychic", "radiant", "thunder", "piercing", "slashing", "bludgeoning", "non_magical",];

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

export const getDamageTypeFrom = (key: string): DamageType => {
    if (!key) return DamageType.ERROR;

    const normalized = key.trim().toUpperCase();

    if (normalized in DamageType) {
        return DamageType[normalized as keyof typeof DamageType];
    }

    return DamageType.ERROR;
}