import diagnosisData from '../data/diagnoses.json';

export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export function getDiagnoses(): Diagnose[] {
    return diagnosisData as Diagnose[];
}