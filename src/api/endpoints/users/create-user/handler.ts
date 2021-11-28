import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../middlewares/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const {name, email} = req.body;

  if (!name || !email) {
    throw createHttpError(422, `Attributes required: [name, email]`);
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  logger.info('Inserted new user in DB');

  res.send(user);
}

export const createUserHandler = wrapHandler(handler);
