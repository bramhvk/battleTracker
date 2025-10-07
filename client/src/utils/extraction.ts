export function getEnumKeys<E extends Record<string, string | number>>(enumObj: E): string[] {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
}
export function getEnumValues<E extends Record<string, string | number>>(enumObj: E): (E[keyof E])[] {
    return Object.values(enumObj).filter(v => typeof v === "number" || typeof v === "string") as E[keyof E][];
}