export const isDefined = (object: any):boolean => object !== undefined;
export const isEmpty = (str?: string | null):boolean => isDefined(str) && (!str || str.trim() === "");
export const isEmptyImage = (arr: string[]): boolean => isDefined(arr) && arr.length <= 1 && isEmpty(arr[0]);