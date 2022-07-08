import patientData from '../data/patients.json';
import { getString, getUUID, isString } from '../tools/utils';

const patients = patientData as Patient[];

const genders = ['male', 'female', 'other'] as const;
type Gender = typeof genders[number];

export type RedactedPatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export function isGender(object: unknown): object is Gender {
    return isString(object) && genders.includes(object as Gender);
}

export function getGender(object: unknown): Gender {
    if (!isGender(object))
        throw 'CastError';
    return object;
}

export function getPatients(): RedactedPatient[] {
    return patients.map(x => {
        delete (x as Partial<Patient>).ssn;
        return x as RedactedPatient;
    });
}

export function addPatient(patient: NewPatient) {
    const newPatient = { ...patient, id: getUUID() };
    patients.push(newPatient);
    return newPatient;
}

export function getPatientFromData(object: unknown): Patient {
    const dirtyData = object as Partial<Patient>;

    try {
        return {
            id: dirtyData.id ? getString(dirtyData.id) : getUUID(),
            name: getString(dirtyData.name),
            dateOfBirth: getDate(dirtyData.dateOfBirth),
            ssn: getString(dirtyData.ssn),
            gender: getGender(dirtyData.gender),
            occupation: getString(dirtyData.occupation),
        };
    } catch (error: unknown) {
        if (error === 'CastError')
            throw { error: 'Invalid patient object' };
        if (error === 'Invalid date')
            throw { error: 'Invalid date' };
        throw error;
    }
}

function getDate(object: unknown): string {
    if (!isString(object))
        throw 'CastError';
    const date = new Date(object);
    if (isNaN(date.getTime()))
        throw 'Invalid date';
    return date.toISOString().split('T')[0];
}