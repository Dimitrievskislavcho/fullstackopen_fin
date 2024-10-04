import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';
import { CustomEntryTypeError } from './newEntryParseMiddleware';

const zodErrorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    response.status(400).send({ error: error.issues });
  } else if (error instanceof CustomEntryTypeError) {
    response.status(400).send({ error: error.message });
  } else {
    next(error);
  }
};

export default zodErrorMiddleware;
