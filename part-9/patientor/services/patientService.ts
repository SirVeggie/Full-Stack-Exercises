import { diagnoses } from '../data/diagnoses';
import { patients } from '../data/patients';
import { getString, getUUID, isNumber, isString } from '../tools/utils';
import { Diagnosis } from './diagnosisService';

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
    entries: Entry[];
};

export type Entry = HospitalEntry | OccupationalEntry | HealthCheckEntry;

export interface BaseEntry {
    id: string;
    type: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnosis['code'][];
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}


export function isGender(object: unknown): object is Gender {
    return isString(object) && genders.includes(object as Gender);
}

export function getGender(object: unknown): Gender {
    if (!isGender(object))
        throw { error: 'Invalid gender' };
    return object;
}

export function isEntry(object: unknown): object is Entry {
    return !!object || true;
}

export function getEntries(object: unknown): Entry[] {
    if (!Array.isArray(object))
        throw { error: 'Invalid entries' };
    if (object.some(entry => !isEntry(entry)))
        throw { error: 'Invalid entries' };
    if (object.some(entry => !isString(entry.type)))
        throw { error: 'Invalid entries' };
    return object as Entry[];
}

export function getPatients(): Patient[] {
    return patients;
}

export function getRedactedPatients(): RedactedPatient[] {
    return patients.map(x => {
        delete (x as Partial<Patient>).ssn;
        return x as RedactedPatient;
    });
}

export function addPatient(patient: NewPatient) {
    const newPatient = { ...patient, id: getUUID(), entries: [] };
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
            entries: getEntries(dirtyData.entries ?? [])
        };
    } catch (error: unknown) {
        if (error === 'CastError')
            throw { error: 'Invalid patient object' };
        if (error === 'Invalid date')
            throw { error: 'Invalid date' };
        throw error;
    }
}

export function getPatientById(id: string): Patient {
    const patient = patients.find(x => x.id === id);
    if (!patient)
        throw { error: 'Patient not found' };
    return patient;
}

export function getEntryFromData(object: unknown): Entry {
    const dirtyData = object as Entry;

    if (!isString(dirtyData.type))
        throw { error: 'entry type missing or not a string' };
    const entry: BaseEntry = {
        id: getUUID(),
        type: dirtyData.type,
        description: getString(dirtyData.description),
        date: getDate(dirtyData.date),
        specialist: getString(dirtyData.specialist),
        diagnosisCodes: getDiagnosisCodes(dirtyData.diagnosisCodes)
    };

    switch (dirtyData.type) {
        case 'Hospital':
            const hospital = dirtyData;
            return {
                ...entry,
                discharge: {
                    date: getDate(hospital.discharge.date),
                    criteria: getString(hospital.discharge.criteria)
                }
            } as HospitalEntry;
        case 'OccupationalHealthcare':
            const occupational = dirtyData;
            return {
                ...entry,
                employerName: getString(occupational.employerName),
                sickLeave: !occupational.sickLeave ? undefined : {
                    startDate: getDate(occupational.sickLeave.startDate),
                    endDate: getDate(occupational.sickLeave.endDate)
                }
            } as OccupationalEntry;
        case 'HealthCheck':
            const healthCheck = dirtyData;
            return {
                ...entry,
                healthCheckRating: getHealthCheckRating(healthCheck.healthCheckRating)
            } as HealthCheckEntry;
        default:
            throw { error: 'Invalid entry type' };
    }
}

function getDiagnosisCodes(object: unknown): Diagnosis['code'][] | undefined {
    if (object === undefined)
        return undefined;
    if (!Array.isArray(object))
        throw { error: 'Invalid diagnosis codes' };
    const codes = diagnoses.map(x => x.code);
    if (object.some(code => !isString(code) || !codes.includes(code)))
        throw { error: 'Invalid diagnosis codes' };
    return object as Diagnosis['code'][];
}

function getHealthCheckRating(object: unknown): HealthCheckRating {
    if (!isNumber(object))
        throw { error: 'Invalid health check rating' };
    const rating = HealthCheckRating[object];
    if (!rating)
        throw { error: 'Invalid health check rating' };
    return object;
}

function getDate(object: unknown): string {
    if (!isString(object))
        throw 'CastError';
    const date = new Date(object);
    if (isNaN(date.getTime()))
        throw 'Invalid date';
    return date.toISOString().split('T')[0];
}