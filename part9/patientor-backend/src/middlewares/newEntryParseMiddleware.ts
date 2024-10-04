import { NextFunction, Request, Response } from 'express';
import {
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
} from '../types/patients';

export class CustomEntryTypeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const newEntryParseMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const entryType: unknown = request.body.type;

    if (!entryType) {
      next(new CustomEntryTypeError('Missing entry type'));
    }

    switch (entryType) {
      case 'Hospital':
        hospitalEntrySchema.parse(request.body);
        break;
      case 'OccupationalHealthcare':
        occupationalHealthcareEntrySchema.parse(request.body);
        break;
      case 'HealthCheck':
        healthCheckEntrySchema.parse(request.body);
        break;
      default:
        next(new CustomEntryTypeError('Incorrect entry type'));
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newEntryParseMiddleware;
