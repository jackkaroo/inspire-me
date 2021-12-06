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
  const following = await prisma.following.findUnique({
    where: {whoId_whomId: {whoId: parseInt(id), whomId: userId}},
  });

  if (!following) {
    throw createHttpError(404, 'Following not found');
  }

  logger.info(`Fetched following for user ${id} from DB to user:`, {message: userId});

  res.send(following);
}

export const getFollowingByIdHandler = wrapHandler(handler, {params: IdParamSchema});
