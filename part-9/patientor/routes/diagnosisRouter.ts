import { Router } from 'express';
import { getDiagnoses } from '../services/diagnosisService';

export const diagnosisRouter = Router();

diagnosisRouter.get('/', (_req, res) => {
    res.send(getDiagnoses());
});