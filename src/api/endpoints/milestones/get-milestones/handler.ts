import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {schema} from './schema';

type QueryParams = {
  challengeId?: number;
  userId?: number;
};

export async function handler(req: Request, res: Response): Promise<void> {
  const where: QueryParams = {};
  const {challengeId, userId} = req.query;

  if (challengeId) {
    where.challengeId = parseInt(challengeId as string);
  }

  if (userId) {
    where.userId = parseInt(userId as string);
  }

  const milestones = await prisma.milestone.findMany({where: where});

  logger.info('Fetched milestones from DB');

  res.send(milestones);
}

export const getMilestonesHandler = wrapHandler(handler, schema);
