export interface Movement {
    speed?: number;
    fly?: number;
    burrow?: number;
    swim?: number;
}

export const emptyMovement: Movement = {
    speed: 0,
    fly: 0,
    burrow: 0,
    swim: 0,
}