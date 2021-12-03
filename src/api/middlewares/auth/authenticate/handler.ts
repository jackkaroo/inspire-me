import {NextFunction, Response} from 'express';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import {prisma} from '../../../../dal/client';
import AuthenticatedRequest, {UserJwtInfo} from '../../../../interfaces';
import {logger} from '../../../../logger/logger';
import {wrapMiddleware} from '../../../utils/middleware-wrapper';

async function handler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  let token = req.cookies.Authorization;

  if (!token) {
    logger.info(token);
    token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw createHttpError(403, 'JWT not provided.');
    }
  }

  const secret = process.env.SECRET;

  if (!secret) {
    throw createHttpError(500, 'Improper server config. Please contact admin.');
  }

  let tokenData;
  try {
    tokenData = jwt.verify(token, secret) as UserJwtInfo;
  } catch (e) {
    next(e);

    return;
  }

  const {id} = tokenData;
  const user = await prisma.user.findUnique({where: {id: id}});

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  logger.info('Login successful.', {user});

  req.user = user;
  next();
}

export const authenticate = wrapMiddleware(handler);