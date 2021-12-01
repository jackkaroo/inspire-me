import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

export async function handler(req: Request, res: Response): Promise<void> {
  const {name, email} = req.body;

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  logger.info('Inserted new user in DB');

  res.send(user);
}

export const createUserHandler = wrapHandler(handler, schema);
