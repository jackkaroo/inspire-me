import {NextFunction, Response} from 'express';
import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest, UserJwtInfo} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapMiddleware} from '../../../utils/middleware-wrapper';

export async function handler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    token = req.cookies.Authorization;
    if (!token) {
      throw createHttpError(401, 'JWT not provided.');
    }
  }

  const secret = process.env.SECRET;

  if (!secret) {
    throw createHttpError(500, 'Improper server config. Unable to verify jwt.');
  }

  let tokenData;
  try {
    tokenData = jwt.verify(token, secret) as UserJwtInfo;
  } catch (e: any) {
    createHttpError(401, e.message);

    return;
  }

  const {id} = tokenData;
  const user = await prisma.user.findUnique({where: {id: id}});

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  logger.info('Middleware auth successful.', {message: JSON.stringify(user)});

  req.user = user;
  next();
}

export const authenticate = wrapMiddleware(handler);
