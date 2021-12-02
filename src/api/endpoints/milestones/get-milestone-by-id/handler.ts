import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';

export async function handler(req: Request, res: Response): Promise<void> {
  const {milestoneId} = req.params;
  const milestone = await prisma.milestone.findUnique({
    where: {id: parseInt(milestoneId)},
  });

  if (!milestone) {
    throw createHttpError(404, 'Milestone not found');
  }

  logger.info('Fetched milestone from DB with id:', {message: milestoneId});

  res.send(milestone);
}

export const getMilestoneByIdHandler = wrapHandler(handler);
