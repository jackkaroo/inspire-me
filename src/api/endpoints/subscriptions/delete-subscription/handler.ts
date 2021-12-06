import {Response} from 'express';
import {prisma} from '../../../../dal/client';
import {logger} from '../../../../logger/logger';
import {AuthenticatedRequest} from '../../../../types';
import {wrapHandler} from '../../../utils/handler-wrapper';
import unwrapUserData from '../../../utils/unwrap-user';
import {IdParamSchema} from '../../../utils/validator';

export async function handler(req: AuthenticatedRequest, res: Response): Promise<void> {
  const {id} = req.params;
  const userId = unwrapUserData(req).id;
  const subscription = await prisma.subscription.delete({
    where: {challengeId_userId: {challengeId: parseInt(id), userId: userId}},
  });

  logger.info('Deleted subscription from DB with id:', {message: id});

  res.send(subscription);
}

export const deleteSubscriptionHandler = wrapHandler(handler, {params: IdParamSchema});
