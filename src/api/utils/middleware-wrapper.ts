import {Prisma} from '@prisma/client';
import {NextFunction, Request, Response} from 'express';
import createHttpError, {HttpError} from 'http-errors';

export function wrapMiddleware(
  middleware: (req: Request, res: Response, next: NextFunction) => Promise<void>
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
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
