import { NextFunction, Request, Response } from 'express';
import { newPatientSchema } from '../types/patients';

const newPatientParseMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse(request.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParseMiddleware;
