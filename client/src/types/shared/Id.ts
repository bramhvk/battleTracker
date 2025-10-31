

export interface ID {
    _id: string;
}
export const createId = (id: string): ID => ({ _id: id });