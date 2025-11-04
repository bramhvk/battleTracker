import {PlayerCharacter} from "../../../types/player/PlayerCharacter";
import {Monster} from "../../../types/monster/Monster";

export interface InitiativeEntry {
    initiative: number;
    entity: PlayerCharacter | Monster;
}

export const createInitiativeEntry = (entity :(PlayerCharacter | Monster)) => {
    return {
        initiative: 0,
        entity,
    }
}
