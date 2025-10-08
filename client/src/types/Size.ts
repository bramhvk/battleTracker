export enum Size {
    //number is the value of the hit dice for the size
    TINY = 4,
    SMALL = 6,
    MEDIUM = 8,
    LARGE = 10,
    HUGE = 12,
    GARGANTUAN = 20,
    ERROR = -1,
}

export const getSizeFromString = (key: string) => {
    const normalized = key.trim().toUpperCase();

    if (normalized in Size) {
        return Size[normalized as keyof typeof Size];
    }

    return Size.ERROR;
}