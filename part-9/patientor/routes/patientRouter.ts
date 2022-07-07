import { Router } from 'express';
import { addPatient, getPatientFromData, getPatients } from '../services/patientService';

export const patientRouter = Router();

patientRouter.get('/api/patients', (_req, res) => {
    res.send(getPatients());
});

patientRouter.post('/api/patients', (req, res) => {
    const patient = getPatientFromData(req.body);
    addPatient(patient);
    res.status(201).send(patient);
});