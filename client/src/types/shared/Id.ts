

export interface ID {
    _id: string;
    name: string;
}
export const createId = (id: string): ID => ({ _id: id, name: "" });