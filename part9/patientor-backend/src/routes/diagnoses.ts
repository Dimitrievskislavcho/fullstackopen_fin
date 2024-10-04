import { Router } from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = Router();

diagnosesRouter.get('/', (_request, response) => {
  response.send(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;
