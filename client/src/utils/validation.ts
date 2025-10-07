export const isDefined = (object: any):boolean => object !== undefined;
export const isStringEmpty = (str?: string | null):boolean => isDefined(str) && (!str || str.trim() === "");
export const isArrayEmpty = (array: string[]): boolean => isDefined(array) && (!array || array.length === 0);
export const isImageEmpty = (arr: string[]): boolean => isDefined(arr) && arr.length <= 1 && isStringEmpty(arr[0]);