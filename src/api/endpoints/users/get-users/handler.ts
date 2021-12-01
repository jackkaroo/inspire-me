import {Request, Response} from 'express';
import {logger} from '../../../../logger/logger';
import {prisma} from '../../../../dal/client';
import {wrapHandler} from '../../../utils/handler-wrapper';

async function handler(req: Request, res: Response): Promise<void> {
  const users = await prisma.user.findMany();
  logger.info('Fetched users from DB');

  res.send(users);
}

export const getUsersHandler = wrapHandler(handler);
