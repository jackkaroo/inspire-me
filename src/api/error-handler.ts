import {NextFunction, Request, Response} from 'express';

function handleError(error: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(500).send({
      status: 500,
      error: {
        code: error.message,
      },
    });
  }
}

export {handleError};
