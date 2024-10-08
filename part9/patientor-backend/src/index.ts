import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRoouter from './routes/patients';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRoouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
