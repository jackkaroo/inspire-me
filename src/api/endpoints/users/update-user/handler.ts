import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;

  const updateResult = await prisma.user.update({
    where: {id: userId},
    data: req.body,
  });

  logger.info('Updated user: ', {message: userId});
  res.send(updateResult);
}

export const updateUserHandler = wrapHandler(handler, schema);
