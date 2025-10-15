enum AT {
    ROUND_START,
    ROUND_END,
    TURN_START,
    TURN_END,
    TURN_END_OF_CHAR
}

export interface Trigger {
    source: string;
    desc: string;
    dc: number,
    at: AT,
}

export const emptyTrigger = {
    source: "",
    desc: "",
    dc: 0,
    at: 0,
} as Trigger;