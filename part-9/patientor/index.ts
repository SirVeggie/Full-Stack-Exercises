import express from 'express';
import cors from 'cors';
import { patientRouter } from './routes/patientRouter';
import { diagnosisRouter } from './routes/diagnosisRouter';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

function errorHandler(error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) {
    
    if (error === 'CastError') {
        return res.status(400).json({ error: 'malformatted data' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if ((error as any).error) {
        return res.status(400).json(error);
    }
    
    console.error(error);
    return res.status(500).send('Unexpected error!');
}