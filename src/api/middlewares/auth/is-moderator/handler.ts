import {NextFunction, Response} from 'express';
import createHttpError from 'http-errors';
import {AuthenticatedRequest} from '../../../../types';
import {wrapMiddleware} from '../../../utils/middleware-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';

export async function handler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (unwrapUserData(req).role !== 'MODERATOR') {
    throw createHttpError(401, '');
  }
  next();
}

export const isModerator = wrapMiddleware(handler);
