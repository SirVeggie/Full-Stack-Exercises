import { Router } from 'express';
import { addPatient, getPatientFromData, getPatients } from '../services/patientService';

export const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    res.send(getPatients());
});

patientRouter.post('/', (req, res) => {
    try {
        const patient = getPatientFromData(req.body);
        addPatient(patient);
        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
});