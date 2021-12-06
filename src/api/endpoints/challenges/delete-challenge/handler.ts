import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {deleteContentById} from '../../../../dal/content';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  const userId = unwrapUserData(req).id;
  const challenge = await prisma.challenge.findUnique({where: {id: id}});

  if (!challenge) {
    throw createHttpError(404, 'Challenge not found');
  }

  if (challenge.userId !== userId) {
    throw createHttpError(403, 'Current user does not own the challenge.');
  }

  const deletionResult = await deleteContentById(id);

  logger.info('Deleted challenge from DB with id:', {message: id});

  res.send(deletionResult);
}

export const deleteChallengeHandler = wrapHandler(handler, {params: IdParamSchema});
