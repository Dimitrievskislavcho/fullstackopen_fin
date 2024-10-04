import { Request, Router, Response } from 'express';
import patientsService from '../services/patientsService';
import * as z from 'zod';
import newPatientParseMiddleware from '../middlewares/newPatientParseMiddleware';
import { NewEntry, NewPatient } from '../types/patients';
import zodErrorMiddleware from '../middlewares/zodErrorMiddleware';
import newEntryParseMiddleware from '../middlewares/newEntryParseMiddleware';

const patientsRoouter = Router();

patientsRoouter.get('/', (_request, response) => {
  response.send(patientsService.getPatients());
});

patientsRoouter.get('/:id', (request, response) => {
  response.send(patientsService.getPatientById(request.params.id));
});

patientsRoouter.post(
  '/:id/entries',
  newEntryParseMiddleware,
  (request: Request<{ id: string }, unknown, NewEntry>, response: Response) => {
    try {
      const newPatient = patientsService.addEntry(
        request.params.id,
        request.body
      );
      response.status(201).json(newPatient);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        response.status(400).send({ error: error.issues });
      } else {
        response.status(400).send({ error: 'unknown error' });
      }
    }
  }
);

patientsRoouter.post(
  '/',
  newPatientParseMiddleware,
  (request: Request<unknown, unknown, NewPatient>, response: Response) => {
    try {
      const newPatient = patientsService.addPatient(request.body);
      response.status(201).json(newPatient);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        response.status(400).send({ error: error.issues });
      } else {
        response.status(400).send({ error: 'unknown error' });
      }
    }
  }
);

patientsRoouter.use(zodErrorMiddleware);

export default patientsRoouter;
