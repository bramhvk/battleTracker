import {statKeys, Stats} from "./Stats";
import {Skill, skills} from "./Skill";

export const proficiencies = [...skills, ...statKeys];

export interface Proficiency {
    value: keyof Stats | keyof Skill;
}

export const emptyProficiencies: Proficiency[] = [];

