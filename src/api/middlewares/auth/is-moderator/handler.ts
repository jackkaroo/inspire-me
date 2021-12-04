import {NextFunction, Response} from 'express';
import createHttpError from 'http-errors';
import AuthenticatedRequest from '../../../../interfaces';
import {wrapMiddleware} from '../../../utils/middleware-wrapper';

export async function handler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (req.user?.role !== 'MODERATOR') {
    throw createHttpError(401, '');
  }
  next();
}

export const isModerator = wrapMiddleware(handler);
