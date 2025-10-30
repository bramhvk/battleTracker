export const movementKeys = ["speed", "fly", "hover", "burrow", "swim", "climb"] as const;

export interface Movement {
    speed?: number;
    fly?: number;
    hover?: number;
    burrow?: number;
    swim?: number;
    climb?: number;
}

const emptyMovementObject: Movement = {
    speed: 0,
    fly: 0,
    hover: 0,
    burrow: 0,
    swim: 0,
    climb: 0,
}

export const emptyMovement: Movement = {...emptyMovementObject}