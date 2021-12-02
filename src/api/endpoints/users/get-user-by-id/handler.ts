import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const {userId} = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  logger.info('Fetched user from DB with id: ', {message: userId});

  res.send(user);
}

export const getUserByIdHandler = wrapHandler(handler);
