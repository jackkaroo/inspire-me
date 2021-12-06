import createHttpError, {HttpError} from 'http-errors';
import {NextFunction, Request, Response} from 'express';
import {Schema} from 'ajv';
import {Prisma} from '@prisma/client';
import {RequestValidationSchemas} from '../../types';
import {ajv} from './validator';

function applyValidator(schema: Schema, data: any) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const details = validate.errors;

    throw createHttpError(422, 'Unprocessable Entity', {details});
  }
}

export function wrapHandler(
  handler: (req: Request, res: Response) => void,
  validators?: RequestValidationSchemas
): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators) {
        if (validators.body) {
          applyValidator(validators.body, req.body);
        }

        if (validators.query) {
          applyValidator(validators.query, req.query);
        }

        if (validators.params) {
          applyValidator(validators.params, req.params);
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
