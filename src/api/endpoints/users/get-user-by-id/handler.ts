import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: Request, res: Response): Promise<void> {
  const {id} = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      email: true,
      avatarId: true,
      name: true,
    },
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  logger.info('Fetched user from DB with id: ', {message: id});

  res.send(user);
}

export const getUserByIdHandler = wrapHandler(handler, {params: IdParamSchema});
