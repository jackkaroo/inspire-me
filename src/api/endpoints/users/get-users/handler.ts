import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

async function handler(req: Request, res: Response): Promise<void> {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      role: true,
      avatarId: true,
    },
  });
  logger.info('Fetched users from DB');

  res.send(users);
}

export const getUsersHandler = wrapHandler(handler);
