import {Stats} from "./Stats";
import {Skill} from "./Skill";

export interface Proficiency {
    value: keyof Stats | keyof Skill;
}

export const emptyProficiencies: Proficiency[] = [];

