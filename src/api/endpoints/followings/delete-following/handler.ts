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
  const following = await prisma.following.delete({
    where: {
      whoId_whomId: {whoId: userId, whomId: parseInt(id)},
    },
  });

  logger.info(`Deleted following for user ${userId} from DB with id:`, {message: id});

  res.send(following);
}

export const deleteFollowingHandler = wrapHandler(handler, {params: IdParamSchema});
