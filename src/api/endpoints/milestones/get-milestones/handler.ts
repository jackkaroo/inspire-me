import {Request, Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const milestones = await prisma.milestone.findMany();
  //TODO add fetch by userId and challengeId
  logger.info('Fetched milestones from DB');

  res.send(milestones);
}

export const getMilestonesHandler = wrapHandler(handler);
