import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {schema} from './schema';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = unwrapUserData(req).id;
  const challengeId = parseInt(req.body.challengeId as string);
  const subscription = await prisma.subscription.create({
    data: {challengeId: challengeId, userId: userId},
  });

  logger.info(`User ${userId} subscribed to challenge ${challengeId}`);

  res.send(subscription);
}

export const addSubscriptionHandler = wrapHandler(handler, schema);
