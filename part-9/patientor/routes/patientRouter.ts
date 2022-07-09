import { Router } from 'express';
import { addPatient, getEntryFromData, getPatientById, getPatientFromData, getPatients } from '../services/patientService';
import { isError } from '../tools/utils';

export const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    res.send(getPatients());
});

patientRouter.post('/', (req, res) => {
    const patient = getPatientFromData(req.body);
    addPatient(patient);
    res.status(201).send(patient);
});

patientRouter.get('/:id', (req, res) => {
    res.send(getPatientById(req.params.id));
});

patientRouter.post('/:id/entries', (req, res) => {
    const patient = getPatientById(req.params.id);
    try {
        const entry = getEntryFromData(req.body);
        patient.entries.push(entry);
        res.status(201).send(entry);
    } catch (e: unknown) {
        if (isError(e)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            throw { ...e, body: req.body };
        }
    }
});
