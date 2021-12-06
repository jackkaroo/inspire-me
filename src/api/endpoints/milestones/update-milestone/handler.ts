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
  const milestoneId = parseInt(req.params.id);
  const milestone = await prisma.milestone.findUnique({where: {id: milestoneId}});

  if (!milestone) {
    throw createHttpError(404, 'Milestone not found.');
  }

  if (milestone.userId !== userId) {
    throw createHttpError(403, 'Milestone is not owned by current user');
  }

  const updateResult = await prisma.milestone.update({
    where: {id: milestoneId},
    data: req.body,
  });

  logger.info('Updated milestone: ', {message: milestoneId});
  res.send(updateResult);
}

export const updateMilestoneHandler = wrapHandler(handler, schema);
