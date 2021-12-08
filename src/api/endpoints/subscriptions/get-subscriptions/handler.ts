import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

type QueryParams = {
  userId?: number;
  challengeId?: number;
};

export async function handler(req: Request, res: Response): Promise<void> {
  const where: QueryParams = {};
  const {userId, challengeId} = req.query;

  if (userId) {
    where.userId = parseInt(userId as string);
  }

  if (challengeId) {
    where.challengeId = parseInt(challengeId as string);
  }

  const subscriptions = await prisma.subscription.findMany({
    where: where,
    include: {challenge: {select: {title: true}}},
  });
  logger.info('Fetched subscriptions from DB');

  res.send(subscriptions);
}

export const getSubscriptionsHandler = wrapHandler(handler);
