import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;

  const deletionResult = await prisma.comment.delete({where: {id: userId}});

  logger.info('Deleted user from DB with id:', {message: userId});

  res.send(deletionResult);
}

export const deleteUserHandler = wrapHandler(handler);
