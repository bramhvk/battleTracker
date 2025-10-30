enum AT {
    ROUND_START = "round_start",
    ROUND_END = "round_end",
    TURN_START = "round_start",
    TURN_END = "round_end",
    TURN_END_OF_CHAR = "round_end_of_char",
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
    at: AT.ROUND_START,
} as Trigger;