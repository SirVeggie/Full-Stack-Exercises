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
app.use('/api/diagnosis', diagnosisRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});