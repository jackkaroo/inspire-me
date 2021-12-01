import createHttpError, {HttpError} from 'http-errors';
import {NextFunction, Request, Response} from 'express';
import {Schema} from 'ajv';
import {Prisma} from '@prisma/client';
import {ajv} from './validator';

export function wrapHandler(
  handler: (req: Request, res: Response) => void,
  schema?: Schema
): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema) {
        const data = req.body;

        const validate = ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
          const details = validate.errors;

          return next(createHttpError(422, 'Unprocessable Entity', {details}));
        }
      }

      await handler(req, res);
    } catch (error) {
      if (error instanceof HttpError) {
        return next(error);
      }

      if (
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        return next(createHttpError(500, error.message, {code: 'PRISMA_ERROR'}));
      }

      return next(createHttpError(500, (error as any).message, {code: 'INTERNAL_ERROR'}));
    }
  };
}
