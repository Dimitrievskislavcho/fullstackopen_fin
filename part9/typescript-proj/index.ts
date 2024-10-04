import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  } else {
    res.status(200).json({
      height,
      weight,
      result: calculateBmi(Number(height), Number(weight)),
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(req.body);
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing',
    });

    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(
      (exercise) => typeof exercise !== 'number' || isNaN(exercise)
    ) ||
    typeof target !== 'number'
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    });

    return;
  }

  res.status(200).json(calculateExercises(daily_exercises as number[], target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
