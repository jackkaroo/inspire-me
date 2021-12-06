import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {AuthenticatedRequest} from '../../../../types';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;
  const challengeId = parseInt(req.params.id);
  const challenge = await prisma.challenge.findUnique({where: {id: challengeId}});

  if (!challenge) {
    throw createHttpError(404, 'Challenge not found.');
  }

  if (challenge.userId !== userId) {
    throw createHttpError(403, 'Challenge is not owned by current user');
  }

  const updateResult = await prisma.challenge.update({
    where: {id: challengeId},
    data: req.body,
  });

  logger.info('Updated challenge: ', {message: challengeId});

  res.send(updateResult);
}

export const updateChallengeHandler = wrapHandler(handler, schema);
