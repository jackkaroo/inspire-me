import {NextFunction, Request, Response} from 'express';
import {HttpError} from 'http-errors';

export function handleError(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(error.statusCode).send({
      error: {
        statusCode: error.statusCode,
        message: error.message,
        ...(error.code && {code: error.code}),
      },
    });
  }
}
