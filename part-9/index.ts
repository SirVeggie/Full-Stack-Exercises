import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);
    return res.send({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    const body = req.body as { daily_exercises: number[], target: number };
    
    if (!body || !body.daily_exercises || body.target == null) {
        return res.status(400).send({ error: 'missing parameters' });
    }
    
    const daily_exercises = body.daily_exercises.map?.(x => Number(x));
    const target = Number(body.target);

    if (isNaN(target) || daily_exercises == null || daily_exercises.some(x => isNaN(x))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    
    const result = calculateExercise(daily_exercises, target);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});