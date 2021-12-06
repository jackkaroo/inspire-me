import {Response} from 'express';
import createHttpError from 'http-errors';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {id} = req.params;
  const userId = unwrapUserData(req).id;
  const subscription = await prisma.like.findUnique({
    where: {contentId_userId: {contentId: parseInt(id), userId: userId}},
  });

  if (!subscription) {
    throw createHttpError(404, 'Like not found');
  }

  logger.info(`Fetched like for user ${userId} from DB with contentId:`, {message: id});

  res.send(subscription);
}

export const getLikeByIdHandler = wrapHandler(handler, {params: IdParamSchema});
