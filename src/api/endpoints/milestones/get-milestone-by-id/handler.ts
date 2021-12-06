import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {wrapHandler} from '../../../utils/handler-wrapper';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: Request, res: Response): Promise<void> {
  const {id} = req.params;
  const milestone = await prisma.milestone.findUnique({
    where: {id: parseInt(id)},
  });

  if (!milestone) {
    throw createHttpError(404, 'Milestone not found');
  }

  logger.info('Fetched milestone from DB with id:', {message: id});

  res.send(milestone);
}

export const getMilestoneByIdHandler = wrapHandler(handler, {params: IdParamSchema});
