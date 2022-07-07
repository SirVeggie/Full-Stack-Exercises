import { Router } from 'express';
import { getDiagnoses } from '../services/diagnosisService';

export const diagnosisRouter = Router();

diagnosisRouter.get('/api/diagnoses', (_req, res) => {
    res.send(getDiagnoses());
});