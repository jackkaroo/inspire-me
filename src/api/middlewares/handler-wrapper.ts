import createHttpError, {HttpError} from 'http-errors';
import {NextFunction, Request, Response} from 'express';
import {Prisma} from '@prisma/client';

export function wrapHandler(
  handler: (req: Request, res: Response) => void
): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);

        return;
      }

      if (
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        next(createHttpError(500, error.message, {code: 'PRISMA_ERROR'}));

        return;
      }

      next(createHttpError(500, (error as any).message, {code: 'INTERNAL_ERROR'}));
    }
  };
}
