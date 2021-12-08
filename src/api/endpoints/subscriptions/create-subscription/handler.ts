import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;
  const challengeId = parseInt(req.body.challengeId as string);

  const challenge = await prisma.challenge.findUnique({
    where: {id: challengeId},
  });

  if (!challenge) {
    throw createHttpError(404, 'Attempt to subscribe to non-existing challenge');
  }

  if (challenge.parentId !== null) {
    throw createHttpError(403, 'Attempt to subscribe to subchallenge');
  }

  if (challenge.userId === userId) {
    throw createHttpError(403, 'Attempt to subscribe to own challenge');
  }

  const subscription = await prisma.subscription.create({
    data: {challengeId: challengeId, userId: userId},
  });

  logger.info(`User ${userId} subscribed to challenge ${challengeId}`);

  res.send(subscription);
}

export const addSubscriptionHandler = wrapHandler(handler, schema);
