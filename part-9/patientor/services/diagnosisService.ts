import { diagnoses } from '../data/diagnoses';

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export function getDiagnoses(): Diagnosis[] {
    return diagnoses;
}